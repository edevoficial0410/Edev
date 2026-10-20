/**
 * frontend/js/contact.js
 * Lógica do formulário de contato do Edev.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btnSubmit = document.getElementById('btnSubmit');
  const alertBox = document.getElementById('alertBox');
  const btnText = btnSubmit?.querySelector('.btn-text');

  // Define a URL base da API
  const API_BASE = window.EDEV_API_BASE || (
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:'
      ? 'http://localhost:3001'
      : ''
  );

  function showAlert(type, message) {
    if (!alertBox) return;
    alertBox.className = `alert-box show ${type}`;
    const icon = type === 'success'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    alertBox.innerHTML = `${icon}<span>${message}</span>`;
  }

  function hideAlert() {
    if (!alertBox) return;
    alertBox.className = 'alert-box';
    alertBox.innerHTML = '';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value;
    const message = document.getElementById('message')?.value.trim();

    // Validação inicial no cliente
    if (!name || name.length < 2) {
      showAlert('error', 'Por favor, informe seu nome com pelo menos 2 caracteres.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlert('error', 'Por favor, informe um endereço de email válido.');
      return;
    }
    if (!subject) {
      showAlert('error', 'Por favor, selecione um assunto.');
      return;
    }
    if (!message || message.length < 10) {
      showAlert('error', 'Sua mensagem deve conter no mínimo 10 caracteres.');
      return;
    }

    // Estado de loading
    btnSubmit.disabled = true;
    btnSubmit.classList.add('loading');
    const originalText = btnText ? btnText.textContent : 'Enviar mensagem';
    if (btnText) btnText.textContent = 'Enviando...';

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        showAlert('success', 'Mensagem enviada com sucesso! Responderemos em até 48 horas.');
        form.reset();
      } else {
        showAlert('error', data.message || 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.');
      }
    } catch (err) {
      console.error('[Contato] Erro ao enviar mensagem:', err);
      showAlert('error', 'Erro ao conectar ao servidor. Verifique sua conexão e tente novamente.');
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.classList.remove('loading');
      if (btnText) btnText.textContent = originalText;
    }
  });
});
