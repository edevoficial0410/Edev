/**
 * js/auth.js
 * Módulo completo de autenticação e comunicação com a API do Edev.
 */

export const API_BASE = (typeof window !== 'undefined' && window.EDEV_API_BASE) || 'https://edev-production.up.railway.app';


export const TOKEN_KEYS = {
  ACCESS: 'edev_access_token',
  REFRESH: 'edev_refresh_token',
  USER: 'edev_user',
  NAME: 'edev_name',
  EMAIL: 'edev_email',
  PLAN: 'edev_plan',
  IS_FOUNDER: 'edev_is_founder',
};

// ── Utilitários de Armazenamento Local ─────────────────────────────

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEYS.ACCESS);
}

export function getRefreshToken() {
  return localStorage.getItem(TOKEN_KEYS.REFRESH);
}

export function getUserPlan() {
  return localStorage.getItem(TOKEN_KEYS.PLAN) || 'free';
}

export function isFounder() {
  return localStorage.getItem(TOKEN_KEYS.IS_FOUNDER) === '1' || getUserPlan() === 'founder';
}

export function hasActiveSubscription() {
  const plan = getUserPlan();
  return isFounder() || plan === 'monthly' || plan === 'yearly';
}

export function saveTokens({ accessToken, refreshToken, user }) {
  if (accessToken) {
    localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(TOKEN_KEYS.REFRESH, refreshToken);
  }
  if (user) {
    localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
    if (user.name) localStorage.setItem(TOKEN_KEYS.NAME, user.name);
    if (user.email) localStorage.setItem(TOKEN_KEYS.EMAIL, user.email);
    if (user.plan) localStorage.setItem(TOKEN_KEYS.PLAN, user.plan);
    if (user.is_founder !== undefined) localStorage.setItem(TOKEN_KEYS.IS_FOUNDER, String(user.is_founder));
  }
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEYS.ACCESS);
  localStorage.removeItem(TOKEN_KEYS.REFRESH);
  localStorage.removeItem(TOKEN_KEYS.USER);
  localStorage.removeItem(TOKEN_KEYS.NAME);
  localStorage.removeItem(TOKEN_KEYS.EMAIL);
  localStorage.removeItem(TOKEN_KEYS.PLAN);
  localStorage.removeItem(TOKEN_KEYS.IS_FOUNDER);
  localStorage.removeItem('edev_members_v2');
  localStorage.removeItem('edev_progress');
  localStorage.removeItem('edev_last_lesson');
  localStorage.removeItem('edev_study_time');

  // Varredura de segurança: remove rigorosamente qualquer chave com prefixo edev_
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.toLowerCase().startsWith('edev_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    console.warn('[AUTH] Erro ao varrer localStorage no clearTokens:', e);
  }
}

export function isAuthenticated() {
  return !!getAccessToken();
}

// ── Cliente HTTP com Auto-Refresh e Tratamento de Erros ───────────

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getAccessToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    let response = await fetch(url, { ...options, headers });

    // Se o token expirou (401), tenta renovar usando o refresh token
    if (response.status === 401 && getRefreshToken() && !endpoint.includes('/refresh')) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        // Repete a requisição com o novo token
        headers['Authorization'] = `Bearer ${getAccessToken()}`;
        response = await fetch(url, { ...options, headers });
      } else {
        clearTokens();
        redirectToLogin();
        throw new Error('Sua sessão expirou. Faça login novamente.');
      }
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || (data.errors && data.errors[0]?.message) || `Erro ${response.status}`;
      const err = new Error(errorMsg);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Não foi possível conectar ao servidor Edev. Verifique se o backend está rodando.');
    }
    throw error;
  }
}

/**
 * Tenta renovar o access token utilizando o refresh token
 */
async function tryRefreshToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    if (data.accessToken && data.refreshToken) {
      saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// ── Ações de Autenticação ─────────────────────────────────────────

export async function login(email, password) {
  // 1. Limpa previamente qualquer dado ou token residual de usuário anterior
  clearTokens();

  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  saveTokens(data);
  return data;
}

export async function register(name, email, password) {
  // 1. Limpa previamente qualquer dado ou token residual de usuário anterior
  clearTokens();

  const data = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

  saveTokens(data);
  return data;
}

export async function logout() {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // Ignora falha de rede ao deslogar
    }
  }

  clearTokens();
  redirectToLogin();
}

export async function getProfile() {
  return apiFetch('/api/auth/me');
}

export async function forgotPassword(email) {
  return apiFetch('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token, newPassword) {
  return apiFetch('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}

/**
 * Exclui permanentemente a conta do usuário autenticado (LGPD - Direito de Exclusão)
 */
export async function deleteAccount() {
  const data = await apiFetch('/api/users/me', {
    method: 'DELETE',
  });
  clearTokens();
  window.location.replace('index.html');
  return data;
}

// ── Redirecionamentos e Guardas de Rota ───────────────────────────

export function redirectToApp() {
  window.location.replace('app.html');
}

export function redirectToLogin() {
  window.location.replace('login.html');
}

/**
 * Guarda para páginas de auth (login, register): se já autenticado, vai para o app
 */
export async function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    // Valida rapidamente se o token ainda é aceito pelo backend
    try {
      await getProfile();
      redirectToApp();
    } catch {
      // Se inválido, limpa e permanece na tela de login
      clearTokens();
    }
  }
}

/**
 * Guarda para a área logada (app.html): se não autenticado, vai para o login
 */
export async function requireAuth() {
  if (!isAuthenticated()) {
    redirectToLogin();
    return null;
  }

  try {
    const res = await getProfile();
    if (res.user) {
      saveTokens({ user: res.user });
      return res.user;
    }
    return null;
  } catch {
    clearTokens();
    redirectToLogin();
    return null;
  }
}

// ── Helpers de Interface (UI) ────────────────────────────────────

export function showAlert(element, type, message) {
  if (!element) return;
  element.className = `auth-alert show ${type}`;
  
  const icon = type === 'success' 
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

  element.innerHTML = `${icon}<span>${message}</span>`;
}

export function hideAlert(element) {
  if (!element) return;
  element.className = 'auth-alert';
  element.innerHTML = '';
}

export function setButtonLoading(button, isLoading, normalText = 'Entrar') {
  if (!button) return;
  if (isLoading) {
    button.disabled = true;
    button.classList.add('loading');
    button.innerHTML = '<span class="spinner"></span><span class="btn-text">Processando...</span>';
  } else {
    button.disabled = false;
    button.classList.remove('loading');
    button.innerHTML = `<span class="btn-text">${normalText}</span>`;
  }
}

export function setupPasswordToggles() {
  document.querySelectorAll('.toggle-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
      } else {
        input.type = 'password';
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
      }
    });
  });
}
