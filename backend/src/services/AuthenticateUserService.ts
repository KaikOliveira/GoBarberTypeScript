import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    // Verificação de email
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorreto email/password.');
    }

    // ----- Verificação de password ---------
    // user.password = Senha criptografada
    // Request / password = Senha nao-criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorreto email/password.');
    }

    // User Autenticado => Gerar um token
    const token = sign({}, '8a85c2b72edc73beac185409f01aff70', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
