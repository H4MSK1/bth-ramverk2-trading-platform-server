import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDTO } from './user.dto';
import { UserStock } from './user_stock.entity';
import { omit } from '../../components/utils';

describe('UserService', () => {
  let repository: Repository<User>;
  let service: UserService;
  let module: TestingModule;

  const userEntities = [
    <User>{
      email: 'userOne@test.test',
      password: 'pass',
      first_name: 'name',
      last_name: 'name',
    },
    <User>{
      email: 'userTwo@test.test',
      password: 'pass',
      first_name: 'name',
      last_name: 'name',
    },
  ];

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserStock),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users with [password] omitted', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce(userEntities);

    const result = await service.findAll();
    const expected = userEntities.map(user => omit(user, 'password'));
    expect(result).toEqual(expected);
  });

  it('should return newly created entity with [password] omitted', async () => {
    const mockEntity: User = userEntities[0];
    const dto = new CreateUserDTO();
    dto.email = mockEntity.email;
    dto.password = mockEntity.password;
    dto.first_name = mockEntity.first_name;
    dto.last_name = mockEntity.last_name;

    jest.spyOn(repository, 'save').mockResolvedValueOnce(mockEntity);

    const result = await service.create(dto);
    expect(result.email).toEqual(dto.email);
    expect(result.password).toBeUndefined();
    expect(result.first_name).toEqual(dto.first_name);
    expect(result.last_name).toEqual(dto.last_name);
  });
});
