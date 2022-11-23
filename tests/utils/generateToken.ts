import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string;

export function generateToken(userId: number): string {
  return jwt.sign(
    { userId },
    SECRET,
    { expiresIn: '30 days' }
  );
}