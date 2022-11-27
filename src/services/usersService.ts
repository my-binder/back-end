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
  if (!data.email && !data.displayName && !data.urlName && !data.newPassword)
    throw unprocessable('Must update something');
  if (!data.oldPassword)
    throw unauthorized('Must match old password correctly to update anything');
  const checkPass = await bcrypt.compare(data.oldPassword, user.password);
  if (!checkPass)
    throw unauthorized('Must match old password correctly to update anything');
  
  const entries: [string, string][] = [];
  if (data.email) {
    const checkEmail = await usersRepository.findUserByEmail(data.email);
    if (checkEmail && checkEmail.id !== user.id)
      throw conflict('Email unavailable');
    entries.push(['email', data.email]);
  }
  if (data.urlName) {
    const checkUrlName = await usersRepository.findUserByUrlName(data.urlName);
    if (checkUrlName && checkUrlName.id !== user.id)
      throw conflict('URL name unavailable');
    entries.push(['urlName', data.urlName]);
  }
  if (data.displayName) {
    entries.push(['displayName', data.displayName]);
  }
  if (data.newPassword) {
    const passwordHash = await bcrypt.hash(data.newPassword, 10);
    entries.push(['password', passwordHash]);
  }
  const newData = Object.fromEntries(entries);
  await usersRepository.updateUser(user.id, newData);
}