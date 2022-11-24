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

describe('POST /sign-up integration test...', () => {
  it('Sending correct information', async () => {
    const data = userFactory();
    const response = await supertest(app).post('/sign-up').send(data);
    const query = await db.user.findUnique({ where: { email: data.email } });
    expect(response.status).toBe(201);
    expect(query).not.toBeNull();
  });

  it('Sending the same email again', async () => {
    const user1 = await createUser(userFactory());
    const user2 = userFactory();
    const response = await supertest(app)
      .post('/sign-up')
      .send({
        email: user1.email,
        urlName: user2.urlName,
        displayName: user2.displayName,
        password: user2.password
      });
    const query = await db.user.findUnique({ where: { id: 2 } });
    expect(response.status).toBe(409);
    expect(query).toBeNull();
  });

  it('Sending the same URL name again', async () => {
    const user1 = await createUser(userFactory());
    const user2 = userFactory();
    const response = await supertest(app)
      .post('/sign-up')
      .send({
        email: user2.email,
        urlName: user1.urlName,
        displayName: user2.displayName,
        password: user2.password
      });
    const query = await db.user.findUnique({ where: { id: 2 } });
    expect(response.status).toBe(409);
    expect(query).toBeNull();
  });
});