import pkg from '@prisma/client';

export type User = pkg.User;
export type SignInData = Omit<User, 'id' | 'displayName' | 'urlName'>;
export type SignUpData = Omit<User, 'id'>;
export type UpdateUserData = {
  email?: string;
  urlName?: string;
  displayName?: string;
  newPassword?: string;
  oldPassword?: string;
}
