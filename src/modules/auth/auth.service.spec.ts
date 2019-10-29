import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { UserService } from '../user/user.service';
import { getMockedUser } from '../user/user.mock';

jest.mock('../user/user.service');

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;
  let userService: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn(entity => entity) },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user object', async () => {
    const mockUser = await getMockedUser();

    jest.spyOn(userService, 'findByUserId').mockResolvedValueOnce(mockUser);

    const result = await service.validateUser({});
    expect(result).toEqual(mockUser);
  });

  it('should return [token] with payload', async () => {
    const mockUser = await getMockedUser();
    const dto = new AuthDTO();
    dto.username = mockUser.email;
    dto.password = 'pass';

    jest
      .spyOn(userService, 'findOneByEmailWithPassword')
      .mockResolvedValueOnce(mockUser);

    const result = await service.authenticate(dto);
    expect(result).not.toBeNull();
  });
});
