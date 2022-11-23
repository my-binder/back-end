import db from '@/database';
import bcrypt from 'bcrypt';
import { SignUpData, User } from '@/types';

export async function createUser(data: SignUpData): Promise<Omit<User, 'id'>> {
  const hash: string = await bcrypt.hash(data.password, 10);
  await db.user.create({ data: { ...data, password: hash } });
  return {
    username: data.username,
    displayname: data.displayname,
    password: hash
  };
}