import db from '@/database';
import { User, SignUpData, UpdateUserData } from '@/types';

export async function findUserById(
  id: number
): Promise<User | null> {
  return await db.user.findUnique({
    where: { id }
  });
}

export async function findUserByEmail(
  email: string
): Promise<User | null> {
  return await db.user.findUnique({
    where: { email }
  });
}

export async function findUserByUrlName(
  urlName: string
): Promise<User | null> {
  return await db.user.findUnique({
    where: { urlName }
  });
}

export async function insertUser(
  data: SignUpData
): Promise<void> {
  await db.user.create({ data });
}

export async function updateUser(
  id: number,
  data: UpdateUserData
): Promise<void> {
  await db.user.update({
    data,
    where: { id }
  });
}