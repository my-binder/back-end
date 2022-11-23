import supertest from 'supertest';
import db from '../../src/database';
import app from '../../src/app';
import userFactory from '../../prisma/factories/userFactory';
import pageFactory from '../../prisma/factories/pageFactory';
import createUser from '../utils/createUser';
import generateToken from '../utils/generateToken';

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
  await db.$queryRaw`TRUNCATE TABLE pages RESTART IDENTITY CASCADE`;
  await db.$queryRaw`TRUNCATE TABLE entries RESTART IDENTITY CASCADE`;
});

afterAll(() => {
  db.$disconnect();
});

describe('POST /entry integration test...', () => {
  it('Sending correct information, must return 201 and add a new entry', async () => {
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

  it('Sending wrong token, must return 401', async () => {
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

  it('Sending wrong page, must return 401', async () => {
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