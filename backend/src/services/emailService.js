const env = require('../config/env');

/**
 * Envia email de recuperação de senha com link seguro
 */
async function sendPasswordResetEmail({ to, name, resetToken }) {
  const resetUrl = `${env.frontendUrl}/reset-password.html?token=${resetToken}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
        .container { max-width: 560px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; padding: 32px; border: 1px solid #334155; }
        .brand { font-size: 24px; font-weight: bold; color: #38bdf8; margin-bottom: 24px; }
        .btn { display: inline-block; background-color: #0284c7; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 24px 0; }
        .footer { font-size: 13px; color: #94a3b8; border-top: 1px solid #334155; margin-top: 32px; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="brand">Edev // Plataforma de Cursos</div>
        <h2>Redefinição de Senha</h2>
        <p>Olá, <strong>${escapeHtml(name || 'Aluno')}</strong>!</p>
        <p>Recebemos uma solicitação para redefinir a senha de acesso à sua conta na plataforma Edev.</p>
        <p>Clique no botão abaixo para escolher uma nova senha segura:</p>
        <div>
          <a href="${resetUrl}" class="btn" target="_blank" rel="noopener noreferrer">Redefinir Minha Senha</a>
        </div>
        <p style="font-size: 13px; color: #cbd5e1;">Ou copie e cole o link a seguir no seu navegador:<br><a href="${resetUrl}" style="color: #38bdf8; word-break: break-all;">${resetUrl}</a></p>
        <div class="footer">
          <p>⚠️ <strong>Aviso de segurança:</strong> Este link é de uso único e expira em 1 hora.</p>
          <p>Se você não solicitou esta redefinição, por favor desconsidere este email com segurança. Sua conta e senha atuais continuam protegidas.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `Olá, ${name || 'Aluno'}!\n\nRecebemos uma solicitação para redefinir sua senha no Edev.\n\nAcesse o link abaixo para redefinir sua senha (válido por 1 hora):\n${resetUrl}\n\nSe você não solicitou a redefinição, ignore esta mensagem.`;

  return deliverEmail({
    to,
    subject: 'Edev - Recuperação de Senha',
    html: htmlContent,
    text: textContent,
    devLogPrefix: '🔑 [PASSWORD RESET LINK]',
    devLogContent: resetUrl,
  });
}

/**
 * Envia email notificando que a senha da conta foi alterada
 */
async function sendPasswordChangedConfirmation({ to, name }) {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
        .container { max-width: 560px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; padding: 32px; border: 1px solid #334155; }
        .brand { font-size: 24px; font-weight: bold; color: #38bdf8; margin-bottom: 24px; }
        .footer { font-size: 13px; color: #94a3b8; border-top: 1px solid #334155; margin-top: 32px; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="brand">Edev // Plataforma de Cursos</div>
        <h2>Sua senha foi alterada</h2>
        <p>Olá, <strong>${escapeHtml(name || 'Aluno')}</strong>!</p>
        <p>Confirmamos que a senha da sua conta Edev acabou de ser alterada com sucesso.</p>
        <p>Todas as sessões abertas anteriormente foram desconectadas por segurança.</p>
        <div class="footer">
          <p>⚠️ <strong>Atenção:</strong> Se você NÃO realizou essa alteração, acesse imediatamente a plataforma para recuperar o controle da sua conta.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `Olá, ${name || 'Aluno'}!\n\nSua senha no Edev foi alterada com sucesso.\nTodas as sessões anteriores foram encerradas por segurança.\nSe você não realizou esta alteração, recupere o controle da sua conta imediatamente.`;

  return deliverEmail({
    to,
    subject: 'Edev - Sua senha foi alterada com sucesso',
    html: htmlContent,
    text: textContent,
    devLogPrefix: '🔔 [SECURITY ALERT]',
    devLogContent: `Notificação de alteração de senha enviada para ${to}`,
  });
}

/**
 * Função unificada de entrega (Resend ou console em dev)
 */
async function deliverEmail({ to, subject, html, text, devLogPrefix, devLogContent }) {
  if (!env.resendApiKey) {
    console.log(`\n📬 [DEV EMAIL SERVICE] ${subject}`);
    console.log(`   Para: ${to}`);
    console.log(`   ${devLogPrefix}: ${devLogContent}\n`);
    return { success: true, mode: 'console' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.emailFrom,
        to: [to],
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('❌ [RESEND ERROR] Falha ao despachar email:', errText);
      return { success: false, error: errText };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('❌ [EMAIL ERROR] Erro inesperado ao enviar email:', error.message);
    return { success: false, error: error.message };
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  sendPasswordResetEmail,
  sendPasswordChangedConfirmation,
};
