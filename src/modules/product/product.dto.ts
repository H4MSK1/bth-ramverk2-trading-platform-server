import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiModelProperty()
  title: string;

  @ApiModelPropertyOptional()
  description?: string;

  @ApiModelPropertyOptional()
  image?: string;

  @ApiModelProperty()
  price: number;
}

export class UpdateProductDTO {
  @ApiModelProperty()
  id: number;

  @ApiModelPropertyOptional()
  title?: string;

  @ApiModelProperty()
  description?: string;

  @ApiModelPropertyOptional()
  image?: string;

  @ApiModelProperty()
  price: number;
}
