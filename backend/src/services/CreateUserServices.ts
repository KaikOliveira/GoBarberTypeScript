import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

// Interface das variaveis para o POST CREATE
interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    // Verificação se email ja existe
    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('O Email ja pertence a um usuario.');
    }

    // Criptografia da senha
    const hashedPassword = await hash(password, 8);

    // Create User
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save user
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
