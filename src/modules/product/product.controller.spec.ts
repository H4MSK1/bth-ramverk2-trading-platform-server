import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';

jest.mock('./product.service');

describe('ProductController', () => {
  let controller: ProductController;
  let module: TestingModule;
  let productService: ProductService;

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
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  beforeEach(() => {
    productService = module.get<ProductService>(ProductService);
  });

  describe('root', () => {
    it('should return all products', async () => {
      jest
        .spyOn(productService, 'findAll')
        .mockResolvedValueOnce(productEntities);

      const result = await controller.root();
      expect(result).toEqual(productEntities);
    });
  });
});
