import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string;

function generateToken(userId: number): string {
  return jwt.sign(
    { userId },
    SECRET,
    { expiresIn: 60 * 60 * 24 * 30 }
  );
}

export default generateToken;