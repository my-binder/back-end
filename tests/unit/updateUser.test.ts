import userFactory from '../../prisma/factories/userFactory';
import createUser from '../utils/createUser';
import * as repository from '../../src/repositories/usersRepository';
import * as service from '../../src/services/usersService';
import { UpdateUserData } from '../../src/types/userTypes';

describe('Testing updateUser()...', () => {
  jest.spyOn(repository, 'updateUser').mockImplementation(
    async (id: number, data: UpdateUserData) => {return;}
  );

  it('Testing with successful data', async() => {
    const unhashedUser = userFactory();
    const user = await createUser(unhashedUser);
    const newUserData = userFactory();
    const newData = {
      displayname: newUserData.displayname,
      newPassword: newUserData.password,
      oldPassword: unhashedUser.password
    };
    await service.updateUser(newData, { ...user, id: 1 });
    expect(repository.updateUser).toBeCalled();
  });

  it('Sending wrong password', async() => {
    const unhashedUser = userFactory();
    const user = await createUser(unhashedUser);
    const newUserData = userFactory();
    const newData = {
      displayname: newUserData.displayname,
      newPassword: newUserData.password,
      oldPassword: 'a'
    };
    let errMessage = '';
    try {
      await service.updateUser(newData, { ...user, id: 1 });
    } catch (err: any) {
      errMessage = err.message;
    }
    expect(errMessage).toBe('Must match old password correctly to update it');
  });
});