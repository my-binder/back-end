import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersRepository } from '@/repositories';
import { User, SignInData } from '@/types';
import { unauthorized } from '@/errors';

const SECRET = process.env.JWT_SECRET as string;

export function generateToken(
  userId: number
): string {
  return jwt.sign(
    { userId },
    SECRET,
    { expiresIn: "30 days" }
  );
}

export async function validateToken(
  token: string
): Promise<User> {
  try {
    const payload: any = jwt.verify(token, SECRET);
    const user = await usersRepository.findUserById(payload.userId);
    if (!user) throw unauthorized();
    return user;
  } catch (err) {
    throw unauthorized();
  }
}

export async function validateCredentials(
  data: SignInData
): Promise<User> {
  const user = await usersRepository.findUserByEmail(data.email);
  if (!user) throw unauthorized();
  const passwordCheck = await bcrypt.compare(data.password, user.password);
  if (!passwordCheck) throw unauthorized();
  return user;
}
