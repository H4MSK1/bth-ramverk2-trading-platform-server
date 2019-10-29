import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async root() {
    return this.productService.findAll();
  }
}
