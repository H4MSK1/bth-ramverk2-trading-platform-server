import { User } from './user.entity';
import { HashFactory } from '../../components/hash.factory';
import { omit } from '../../components/utils';

export const getMockedUser = async (props = {}) =>
  <User>{
    userId: 'cea2de3e-d504-4575-a22c-b54b384d3d00',
    email: 'test@unit.local',
    password: await HashFactory('pass').generateHash(),
    first_name: 'user',
    last_name: 'user',
    balance: 0,
    createdAt: null,
    ...props,
  };

export const getMockedUserWithoutPassword = async (): Promise<User> =>
  omit(await getMockedUser(), 'password');
