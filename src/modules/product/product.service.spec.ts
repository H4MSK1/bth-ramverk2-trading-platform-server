import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

describe('ProductService', () => {
  let repository: Repository<Product>;
  let service: ProductService;
  let module: TestingModule;

  const productEntities = [
    <Product>{
      id: 1,
      title: 'product 1',
      price: 100,
    },
    <Product>{
      id: 2,
      title: 'product 2',
      price: 100,
    },
  ];

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  beforeEach(() => {
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce(productEntities);

    const result = await service.findAll();
    expect(result).toEqual(productEntities);
  });

  it('should return newly created entity', async () => {
    const mockEntity: Product = productEntities[0];
    const dto = new CreateProductDTO();
    dto.title = mockEntity.title;
    dto.price = mockEntity.price;

    jest.spyOn(repository, 'save').mockResolvedValueOnce(mockEntity);

    const result = await service.create(dto);
    expect(result.price).toEqual(dto.price);
    expect(result.title).toEqual(dto.title);
  });

  it('should modify and return updated entity', async () => {
    const mockEntity: Product = productEntities[0];
    const dto = new UpdateProductDTO();
    dto.id = mockEntity.id;
    dto.title = mockEntity.title;
    dto.price = mockEntity.price + 100;

    const mockEntityUpdated = <Product>{ ...mockEntity, ...dto };

    jest
      .spyOn(repository, 'findOneOrFail')
      .mockResolvedValueOnce(mockEntityUpdated);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(mockEntityUpdated);

    const result = await service.update(dto);
    expect(result.price).not.toEqual(mockEntity.price);
    expect(result.title).toEqual(mockEntity.title);
  });
});
