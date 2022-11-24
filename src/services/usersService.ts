import bcrypt from 'bcrypt';
import { usersRepository } from '@/repositories';
import { conflict, unprocessable, unauthorized } from '@/errors';
import { User, SignUpData, UpdateUserData } from '@/types';

export async function signUp(
  data: SignUpData
): Promise<void> {
  const checkEmail = await usersRepository.findUserByEmail(data.email);
  if (checkEmail) throw conflict('Email unavailable');
  const checkUrlName = await usersRepository.findUserByUrlName(data.urlName);
  if (checkUrlName) throw conflict('URL name unavailable');
  const passwordHash = await bcrypt.hash(data.password, 10);
  const insertData: SignUpData = { ...data, password: passwordHash };
  await usersRepository.insertUser(insertData);
}

export async function updateUser(
  data: UpdateUserData,
  user: User
): Promise<void> {
  if (!data.displayName && !data.urlName && !data.newPassword)
    throw unprocessable('Must update something');
  const entries: [string, string][] = [];
  if (data.newPassword) {
    if (!data.oldPassword)
      throw unauthorized('Must match old password correctly to update it');
    const checkPass = await bcrypt.compare(data.oldPassword, user.password);
    if (!checkPass)
      throw unauthorized('Must match old password correctly to update it');
    const passwordHash = await bcrypt.hash(data.newPassword, 10);
    entries.push(['password', passwordHash]);
  }
  if (data.displayName) {
    entries.push(['displayName', data.displayName]);
  }
  if (data.urlName) {
    const checkUrlName = await usersRepository.findUserByUrlName(data.urlName);
    if (checkUrlName && checkUrlName.id !== user.id)
      throw conflict('URL name unavailable');
  }
  const newData = Object.fromEntries(entries);
  await usersRepository.updateUser(user.id, newData);
}