import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { UserService } from '../user/user.service';
import { getMockedUserWithoutPassword } from '../user/user.mock';
import { CreateUserDTO } from '../user/user.dto';

jest.mock('../auth/auth.service');
jest.mock('../user/user.service');

describe('AuthController', () => {
  let controller: AuthController;
  let module: TestingModule;
  let authService: AuthService;
  let userService: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  beforeEach(() => {
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe('login', () => {
    it('should authenticate user and return token', async () => {
      jest.spyOn(authService, 'authenticate').mockResolvedValueOnce('token');

      const dto = new AuthDTO();
      dto.username = 'user';
      dto.password = 'pass';

      const result = await controller.login(dto);
      expect(result).toEqual('token');
    });
  });

  describe('register', () => {
    it('should register user and return token', async () => {
      const mockUser = await getMockedUserWithoutPassword();
      const dto = new CreateUserDTO();
      dto.password = 'pass1';
      dto.email = 'user@unit.local';
      dto.first_name = 'name';
      dto.last_name = 'name';

      jest.spyOn(userService, 'create').mockResolvedValueOnce(mockUser);
      const result = await controller.register(dto);
      expect(result).toEqual(mockUser);
    });
  });
});
