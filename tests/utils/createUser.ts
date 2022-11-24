import db from '@/database';
import bcrypt from 'bcrypt';
import { SignUpData, User } from '@/types';

export async function createUser(data: SignUpData): Promise<Omit<User, 'id'>> {
  const hash = await bcrypt.hash(data.password, 10);
  await db.user.create({ data: { ...data, password: hash } });
  return {
    email: data.email,
    urlName: data.urlName,
    displayName: data.displayName,
    password: hash
  };
}