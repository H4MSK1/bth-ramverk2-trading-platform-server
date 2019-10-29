import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';
import { CreateStockDTO } from './stock.dto';
import { Product } from '../product/product.entity';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';

jest.mock('../product/product.service');
jest.mock('../user/user.service');

describe('StockService', () => {
  let repository: Repository<Stock>;
  let service: StockService;
  let module: TestingModule;
  let productService: ProductService;

  const stockEntities = [
    <Stock>{
      id: 1,
      rate: 1.005,
      variance: 0.6,
    },
    <Stock>{
      id: 2,
      rate: 1.007,
      variance: 0.4,
    },
  ];

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        StockService,
        ProductService,
        UserService,
        {
          provide: getRepositoryToken(Stock),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  beforeEach(() => {
    repository = module.get<Repository<Stock>>(getRepositoryToken(Stock));
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all stocks', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce(stockEntities);

    const result = await service.findAll();
    expect(result).toEqual(stockEntities);
  });

  it('should return newly created entity', async () => {
    const mockEntity: Stock = stockEntities[0];
    const dto = new CreateStockDTO();
    dto.rate = mockEntity.rate;
    dto.variance = mockEntity.variance;
    dto.productId = 2;

    jest
      .spyOn(productService, 'findById')
      .mockResolvedValueOnce(<Product>{ price: 100 });
    jest.spyOn(repository, 'save').mockResolvedValueOnce(mockEntity);

    const result = await service.create(dto);
    expect(result.variance).toEqual(dto.variance);
    expect(result.rate).toEqual(dto.rate);
  });
});
