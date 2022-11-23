import supertest from 'supertest';
import db from '@/database';
import app from '@/app';
import { userFactory, pageFactory } from '@tests/factories';
import { createUser, generateToken } from '@tests/utils';

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
  await db.$queryRaw`TRUNCATE TABLE pages RESTART IDENTITY CASCADE`;
});

afterAll(() => {
  db.$disconnect();
});

describe('POST /pages integration test...', () => {
  it('Sending correct information, must return 201 and a add a new page', async () => {
    await createUser(userFactory());
    const token = generateToken(1);
    const data = pageFactory();
    const response = await supertest(app)
      .post('/pages')
      .set({ Authorization: `Bearer ${token}` })
      .send(data);
    const page = await db.page.findFirst({
      where: { urlName: data.urlName, title: data.title }
    });
    expect(response.status).toBe(201);
    expect(page).not.toBeNull();
  });
  
  it('Sending wrong token, must return 401', async () => {
    await createUser(userFactory());
    const token = generateToken(2);
    const data = pageFactory();
    const response = await supertest(app)
      .post('/pages')
      .set({ Authorization: `Bearer ${token}` })
      .send(data);
    const page = await db.page.findFirst({
      where: { urlName: data.urlName, title: data.title }
    });
    expect(response.status).toBe(401);
    expect(page).toBeNull();
  });

  it('Sending unavailable url, must return 409', async () => {
    await createUser(userFactory());
    const token = generateToken(1);
    const data1 = pageFactory();
    await db.page.create({ data: { ...data1, userId: 1 } });
    const data2 = pageFactory();
    const response = await supertest(app)
      .post('/pages')
      .set({ Authorization: `Bearer ${token}` })
      .send({ urlName: data1.urlName, title: data2.title });
    const page = await db.page.findFirst({
      where: { urlName: data1.urlName, title: data2.title }
    });
    expect(response.status).toBe(409);
    expect(page).toBeNull();
  });
});