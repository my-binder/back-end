import pkg from '@prisma/client';

export type User = pkg.User;
export type SignInData = Omit<User, 'id' | 'displayname'>;
export type SignUpData = Omit<User, 'id'>;
export type UpdateUserData = {
  displayname?: string,
  newPassword?: string,
  oldPassword?: string,
};
