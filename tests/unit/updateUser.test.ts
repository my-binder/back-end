
import { userFactory } from '@tests/factories';
import { createUser } from '@tests/utils';
import { usersRepository } from '@/repositories';
import { usersService } from '@/services';
import { UpdateUserData } from '@/types';

describe('Testing updateUser()...', () => {
  it('Testing with successful data', async() => {
    jest.spyOn(usersRepository, 'updateUser').mockImplementation(
      async (id: number, data: UpdateUserData) => {return;}
    );
    const unhashedUser = userFactory();
    const user = await createUser(unhashedUser);
    const newUserData = userFactory();
    const newData = {
      displayname: newUserData.displayname,
      newPassword: newUserData.password,
      oldPassword: unhashedUser.password
    };
    await usersService.updateUser(newData, { ...user, id: 1 });
    expect(usersRepository.updateUser).toBeCalled();
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
      await usersService.updateUser(newData, { ...user, id: 1 });
    } catch (err: any) {
      errMessage = err.message;
    }
    expect(errMessage).toBe('Must match old password correctly to update it');
  });
});