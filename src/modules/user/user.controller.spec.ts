import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserStock } from './user_stock.entity';
import { Stock } from '../stock/stock.entity';

jest.mock('./user.service');

describe('UserController', () => {
  let controller: UserController;
  let module: TestingModule;
  let userService: UserService;

  const userEntities = [
    <User>{
      userId: 'test-1',
      email: 'userOne@test.test',
      password: 'pass',
      first_name: 'name',
      last_name: 'name',
      balance: 100,
      stocks: [
        <UserStock>{
          id: 1,
          amount: 10,
          price_when_purchased: 25,
          stock: <Stock>{ price: 10 },
        },
        <UserStock>{
          id: 2,
          amount: 7,
          price_when_purchased: 22,
          stock: <Stock>{ price: 15 },
        },
      ],
    },
    <User>{
      userId: 'test-2',
      email: 'userTwo@test.test',
      password: 'pass',
      first_name: 'name',
      last_name: 'name',
      balance: 100,
      stocks: [],
    },
  ];

  function getMockedStocksValue(stocks: UserStock[]) {
    let sum = 0;
    stocks.forEach(item => (sum += item.amount * item.stock.price));
    return sum;
  }

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  beforeEach(() => {
    userService = module.get<UserService>(UserService);
  });

  describe('root', () => {
    it('should return all users', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValueOnce(userEntities);

      const result = await controller.root();
      expect(result).toEqual(userEntities);
    });
  });

  describe('addBalance', () => {
    it('should add balance and return new balance', async () => {
      const mockUser = userEntities[0];
      const newBalance = mockUser.balance + 50;

      jest.spyOn(userService, 'addBalance').mockResolvedValueOnce(newBalance);

      const result = await controller.addBalance(mockUser.userId, 50);
      expect(result).toEqual(newBalance);
    });
  });

  describe('stocks', () => {
    it('should get user stocks', async () => {
      const mockUser = userEntities[0];

      jest.spyOn(userService, 'findByUserId').mockResolvedValueOnce(mockUser);

      const result = await controller.getUserStocks(mockUser.userId);
      expect(result).toEqual(mockUser.stocks);
    });
  });

  describe('stocks/value', () => {
    it('should get user stocks total value', async () => {
      const mockUser = userEntities[0];
      const expected = getMockedStocksValue(mockUser.stocks);

      jest
        .spyOn(userService, 'getCurrentStocksValue')
        .mockResolvedValueOnce(expected);

      const result = await controller.getUserStocksValue(mockUser.userId);
      expect(result).toEqual(expected);
    });
  });
});
