import bcrypt from 'bcrypt';
import { usersRepository } from '@/repositories';
import { conflict, unprocessable, unauthorized } from '@/errors';
import { User, SignUpData, UpdateUserData } from '@/types';

export async function signUp(data: SignUpData): Promise<void> {
  const checkUsername: User | null = await usersRepository.findUserByUsername(data.username);
  if (checkUsername) throw conflict('Username unavailable');
  const passwordHash: string = await bcrypt.hash(data.password, 10);
  const insertData: SignUpData = { ...data, password: passwordHash };
  await usersRepository.insertUser(insertData);
}

export async function updateUser(data: UpdateUserData, user: User): Promise<void> {
  if (!data.displayname && !data.newPassword) throw unprocessable('Must update something');
  const entries: [string, string][] = [];
  if (data.newPassword) {
    if (!data.oldPassword) throw unauthorized('Must match old password correctly to update it');
    const passwordCheck: boolean = await bcrypt.compare(data.oldPassword, user.password);
    if (!passwordCheck) throw unauthorized('Must match old password correctly to update it');
    const passwordHash: string = await bcrypt.hash(data.newPassword, 10);
    entries.push(['password', passwordHash]);
  }
  if (data.displayname) {
    entries.push(['displayname', data.displayname]);
  }
  const newData = Object.fromEntries(entries);
  await usersRepository.updateUser(user.id, newData);
}