import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.repository.find({ relations: ['stocks'] });
  }

  async findById(id: number): Promise<Product> {
    return this.repository.findOneOrFail(id, { relations: ['stocks'] });
  }

  async create(productData: CreateProductDTO): Promise<Product> {
    const model = new Product();
    model.title = productData.title;
    model.description = productData.description;
    model.image = productData.image;
    model.price = productData.price;

    return this.repository.save(model);
  }

  async update(productData: UpdateProductDTO): Promise<Product> {
    const model = await this.findById(productData.id);
    const updatedProduct = Object.assign(model, productData);

    if (updatedProduct.stocks) {
      updatedProduct.stocks.preserveCurrentPrice();
      updatedProduct.stocks.price = updatedProduct.price;
    }

    return this.repository.save(updatedProduct);
  }

  async randomPriceUpdate() {
    const products = await this.findAll();

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const price = Math.floor(Math.random() * 50) + 5;

      if (Math.random() < 0.5 && product.price > price) {
        product.price -= price;
      } else {
        product.price += price;
      }

      await this.update(product);
    }

    return this.findAll();
  }
}
