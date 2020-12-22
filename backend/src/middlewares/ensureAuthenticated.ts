import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is error.', 401);
  }

  // Desestruturação de Array [p1, p2, ,p4] - p1 = position1
  const [, token] = authHeader.split(' ');

  // Comparação de token Verificar
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };
    // console.log(request.user.id);

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
