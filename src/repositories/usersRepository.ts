import db from '@/database';
import { User, SignUpData, UpdateUserData } from '@/types';

export async function findUserById(id: number): Promise<User | null> {
  return await db.user.findUnique({
    where: { id }
  });
}

export async function findUserByUsername(username: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { username }
  });
}

export async function insertUser(data: SignUpData): Promise<void> {
  await db.user.create({ data });
}

export async function updateUser(id: number, data: UpdateUserData): Promise<void> {
  await db.user.update({
    data,
    where: { id }
  });
}