const LoginUseCase = require('../../../application/auth/login');
const RegisterUseCase = require('../../../application/auth/register');

class AuthController {
  constructor(userRepository) {
    this.loginUseCase = new LoginUseCase(userRepository);
    this.registerUseCase = new RegisterUseCase(userRepository);
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUseCase.execute(email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async register(req, res) {
    try {
      const result = await this.registerUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;