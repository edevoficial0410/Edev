const crypto = require('crypto');
const db = require('../db/connection');
const env = require('../config/env');

class KiwifyService {
  /**
   * Retorna estatísticas de usuários e vagas de fundador
   */
  getStats() {
    const totalUsers = db.prepare('SELECT count(*) as count FROM users').get().count;
    const foundersCount = db.prepare('SELECT count(*) as count FROM users WHERE is_founder = 1').get().count;
    const foundersRemaining = Math.max(0, 10 - foundersCount);

    return {
      totalUsers,
      foundersCount,
      foundersRemaining,
    };
  }

  /**
   * Retorna informações dos planos, preços e links oficiais
   */
  getPlans() {
    const { foundersRemaining } = this.getStats();

    return {
      monthly: {
        price: 49.90,
        link: env.kiwifyMonthlyLink,
      },
      yearly: {
        price: 299.90,
        link: env.kiwifyYearlyLink,
      },
      founders: {
        total: 10,
        remaining: foundersRemaining,
      },
    };
  }

  /**
   * Valida o token recebido do webhook da Kiwify usando comparação segura contra timing attacks (timingSafeEqual)
   * Aceita token no query param, header ou body
   */
  verifyToken(receivedToken) {
    if (!receivedToken || typeof receivedToken !== 'string') {
      return false;
    }
    const validToken = (env.kiwifyWebhookToken || 'tap7gfjz911').trim();
    const cleanReceived = receivedToken.trim();

    const bufReceived = Buffer.from(cleanReceived, 'utf8');
    const bufValid = Buffer.from(validToken, 'utf8');

    if (bufReceived.length !== bufValid.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufReceived, bufValid);
  }

  /**
   * Processa os eventos do webhook da Kiwify
   */
  async handleWebhook(payload, token) {
    // 1. Validação de token de segurança
    if (!this.verifyToken(token)) {
      const err = new Error('Token de webhook inválido.');
      err.statusCode = 401;
      throw err;
    }

    if (!payload || typeof payload !== 'object') {
      return { status: 'ignored', message: 'Payload vazio ou inválido' };
    }

    // Identificação do evento e do email do cliente
    const eventType = (
      payload.order_status ||
      payload.subscription_status ||
      payload.event ||
      payload.webhook_event_type ||
      ''
    ).toLowerCase();

    const customerEmail = (
      payload.Customer?.email ||
      payload.customer?.email ||
      payload.email ||
      payload.data?.customer?.email ||
      ''
    ).trim().toLowerCase();

    const customerId = (
      payload.Customer?.id ||
      payload.customer?.id ||
      payload.order_id ||
      payload.subscription_id ||
      null
    );

    console.log(`[KIWIFY WEBHOOK] Evento recebido: "${eventType}" para o email: "${customerEmail}"`);

    if (!customerEmail) {
      console.warn('[KIWIFY WEBHOOK] Nenhum email de cliente identificado no payload.');
      return { status: 'ignored', message: 'Email de cliente não localizado' };
    }

    // Busca usuário pelo email
    const user = db.prepare('SELECT id, is_founder, plan, plan_expires_at FROM users WHERE lower(email) = ?').get(customerEmail);

    if (!user) {
      console.warn(`[KIWIFY WEBHOOK] Usuário com email ${customerEmail} ainda não possui conta no Edev.`);
      // O webhook responde 200 para a Kiwify mesmo se usuário não estiver cadastrado ainda
      return { status: 'success', message: 'Usuário não cadastrado ainda no Edev' };
    }

    // Se o usuário já é fundador vitalício, preservamos seu status de fundador
    if (user.is_founder === 1) {
      console.log(`[KIWIFY WEBHOOK] Usuário ${customerEmail} é Fundador vitalício. Mantendo status fundador.`);
      return { status: 'success', message: 'Usuário é fundador vitalício' };
    }

    // Detecta se o plano é anual ou mensal
    const productTitle = (
      payload.Product?.product_name ||
      payload.product?.name ||
      payload.order?.product_name ||
      ''
    ).toLowerCase();

    const isYearly = productTitle.includes('anual') ||
      productTitle.includes('ano') ||
      productTitle.includes('yearly') ||
      (typeof payload.order_amount === 'number' && payload.order_amount >= 15000);

    const planType = isYearly ? 'yearly' : 'monthly';
    const durationDays = isYearly ? 365 : 30;

    // ── Tratamento por Tipo de Evento ──────────────────────────────
    if (
      eventType.includes('approved') ||
      eventType.includes('paid') ||
      eventType.includes('completed') ||
      eventType.includes('order_approved') ||
      eventType.includes('subscription_approved')
    ) {
      // Nova assinatura ou pagamento aprovado
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + durationDays);
      const expiresAtStr = expiresAt.toISOString();

      db.prepare(`
        UPDATE users 
        SET plan = ?, plan_expires_at = ?, kiwify_customer_id = ?, updated_at = datetime('now')
        WHERE id = ?
      `).run(planType, expiresAtStr, customerId, user.id);

      console.log(`✅ [KIWIFY WEBHOOK] Assinatura aprovada! User ID: ${user.id} | Plano: ${planType} | Expira em: ${expiresAtStr}`);

    } else if (
      eventType.includes('renewed') ||
      eventType.includes('subscription_renewed')
    ) {
      // Renovação recorrente da assinatura
      const baseDate = (user.plan_expires_at && new Date(user.plan_expires_at) > new Date())
        ? new Date(user.plan_expires_at)
        : new Date();

      baseDate.setDate(baseDate.getDate() + durationDays);
      const newExpiresAtStr = baseDate.toISOString();

      db.prepare(`
        UPDATE users 
        SET plan = ?, plan_expires_at = ?, updated_at = datetime('now')
        WHERE id = ?
      `).run(planType, newExpiresAtStr, user.id);

      console.log(`🔄 [KIWIFY WEBHOOK] Assinatura renovada! User ID: ${user.id} | Nova data de expiração: ${newExpiresAtStr}`);

    } else if (
      eventType.includes('canceled') ||
      eventType.includes('cancelled') ||
      eventType.includes('subscription_canceled')
    ) {
      // Assinatura cancelada: MANTÉM acesso até plan_expires_at conforme a regra
      console.log(`ℹ️ [KIWIFY WEBHOOK] Assinatura cancelada pelo cliente ${customerEmail}. Acesso mantido até ${user.plan_expires_at || 'data vigente'}.`);

    } else if (
      eventType.includes('refunded') ||
      eventType.includes('chargeback') ||
      eventType.includes('reversal')
    ) {
      // Reembolso ou chargeback: revogação imediata para plano free
      db.prepare(`
        UPDATE users 
        SET plan = 'free', plan_expires_at = NULL, updated_at = datetime('now')
        WHERE id = ?
      `).run(user.id);

      console.log(`⚠️ [KIWIFY WEBHOOK] Reembolso/Chargeback processado. User ID: ${user.id} revertido para plano 'free'.`);
    }

    return {
      status: 'success',
      event: eventType,
      user_id: user.id,
      plan: planType,
    };
  }
}

module.exports = new KiwifyService();
