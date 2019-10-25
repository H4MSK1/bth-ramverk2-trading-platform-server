export class CreateProductDTO {
  title: string;
  description?: string;
  image?: string;
  price: number;
}

export class UpdateProductDTO {
  id: number;
  title?: string;
  description?: string;
  image?: string;
  price: number;
}
