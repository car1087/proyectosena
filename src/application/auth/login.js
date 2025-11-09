const jwt = require('jsonwebtoken');

class LoginUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
        console.log('Usuario no encontrado para el email:', email);
      throw new Error('Usuario no encontrado');
    }

    if (password !== user.password_hash) {
        console.log('Contraseña inválida para el usuario:', email);
        throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, user: { id: user.id, email: user.email } };
  }
}

module.exports = LoginUseCase;