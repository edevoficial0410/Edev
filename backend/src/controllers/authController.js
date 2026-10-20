const authService = require('../services/authService');

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || '127.0.0.1';
}

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password, plan } = req.body;
      const ip = getClientIp(req);
      const userAgent = req.headers['user-agent'];

      const result = await authService.register({
        name,
        email,
        password,
        plan,
        ip,
        userAgent,
      });

      if (result.alreadyExists) {
        return res.status(400).json({
          status: 'error',
          message: 'Não foi possível concluir o cadastro com esses dados. Se você já possui uma conta, faça login ou recupere seu acesso.',
        });
      }

      return res.status(201).json({
        status: 'success',
        message: 'Conta criada com sucesso!',
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const ip = getClientIp(req);
      const userAgent = req.headers['user-agent'];

      const result = await authService.login({
        email,
        password,
        ip,
        userAgent,
      });

      return res.status(200).json({
        status: 'success',
        message: 'Login realizado com sucesso!',
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      await authService.logout({ refreshToken });

      return res.status(200).json({
        status: 'success',
        message: 'Sessão encerrada com sucesso.',
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const ip = getClientIp(req);
      const userAgent = req.headers['user-agent'];

      const tokens = await authService.refresh({
        refreshToken,
        ip,
        userAgent,
      });

      return res.status(200).json({
        status: 'success',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req, res, next) {
    try {
      const user = await authService.getMe(req.userId);

      return res.status(200).json({
        status: 'success',
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const ip = getClientIp(req);

      const result = await authService.forgotPassword({ email, ip });

      return res.status(200).json({
        status: 'success',
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;
      const ip = getClientIp(req);

      const result = await authService.resetPassword({
        token,
        newPassword,
        ip,
      });

      return res.status(200).json({
        status: 'success',
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
