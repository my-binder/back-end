import supertest from 'supertest';
import db from '../../src/database';
import app from '../../src/app';
import userFactory from '../../prisma/factories/userFactory';
import createUser from '../utils/createUser';

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

afterAll(() => {
  db.$disconnect();
});

describe('POST /sign-in integration test...', () => {
  it('Sending correct information, must return 200 and a token', async () => {
    const user = userFactory();
    await createUser(user);
    const response = await supertest(app)
      .post('/sign-in')
      .send({
        username: user.username,
        password: user.password
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Sending inexistent username, must return 401', async () => {
    const user = userFactory();
    const response = await supertest(app)
      .post('/sign-in')
      .send({
        username: user.username,
        password: user.password
      });
    expect(response.status).toBe(401);
  });

  it('Sending wrong password, must return 401', async () => {
    const user = userFactory();
    await createUser(user);
    const response = await supertest(app)
      .post('/sign-in')
      .send({
        username: user.username,
        password: user.password + '0'
      });
    expect(response.status).toBe(401);
  });
});