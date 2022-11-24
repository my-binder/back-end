import supertest from 'supertest';
import db from '@/database';
import app from '@/app';
import { userFactory } from '@tests/factories';
import { createUser } from '@tests/utils';

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

afterAll(() => {
  db.$disconnect();
});

describe('POST /sign-in integration test...', () => {
  it('Sending correct information', async () => {
    const user = userFactory();
    await createUser(user);
    const response = await supertest(app)
      .post('/sign-in')
      .send({
        email: user.email,
        password: user.password
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Sending inexistent email', async () => {
    const user = userFactory();
    const response = await supertest(app)
      .post('/sign-in')
      .send({
        email: user.email,
        password: user.password
      });
    expect(response.status).toBe(401);
  });

  it('Sending wrong password', async () => {
    const user = userFactory();
    await createUser(user);
    const response = await supertest(app)
      .post('/sign-in')
      .send({
        email: user.email,
        password: user.password + '0'
      });
    expect(response.status).toBe(401);
  });
});