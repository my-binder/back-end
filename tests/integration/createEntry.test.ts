import supertest from 'supertest';
import db from '@/database';
import app from '@/app';
import { userFactory, pageFactory } from '@tests/factories';
import { createUser, generateToken } from '@tests/utils';

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
  await db.$queryRaw`TRUNCATE TABLE pages RESTART IDENTITY CASCADE`;
  await db.$queryRaw`TRUNCATE TABLE entries RESTART IDENTITY CASCADE`;
});

afterAll(() => {
  db.$disconnect();
});

describe('POST /entry integration test...', () => {
  it('Sending correct information', async () => {
    await createUser(userFactory());
    const token = generateToken(1);
    const pageData = pageFactory();
    await db.page.create({ data: { ...pageData, userId: 1 } });
    const response = await supertest(app)
      .post('/entries/1')
      .set({ Authorization: `Bearer ${token}` })
      .send({});
    const entry = await db.entry.findFirst({ where: { pageId: 1 } });
    expect(response.status).toBe(201);
    expect(entry).not.toBeNull();
  });

  it('Sending wrong token', async () => {
    await createUser(userFactory());
    const token = generateToken(2);
    const pageData = pageFactory();
    await db.page.create({ data: { ...pageData, userId: 1 } });
    const response = await supertest(app)
      .post('/entries/1')
      .set({ Authorization: `Bearer ${token}` })
      .send({});
    const entry = await db.entry.findFirst({ where: { pageId: 1 } });
    expect(response.status).toBe(401);
    expect(entry).toBeNull();
  });

  it('Sending to wrong page', async () => {
    await createUser(userFactory());
    await createUser(userFactory());
    const token = generateToken(1);
    const pageData = pageFactory();
    await db.page.create({ data: { ...pageData, userId: 2 } });
    const response = await supertest(app)
      .post('/entries/1')
      .set({ Authorization: `Bearer ${token}` })
      .send({});
    const entry = await db.entry.findUnique({ where: { id: 2 } });
    expect(response.status).toBe(401);
    expect(entry).toBeNull();
  })
});