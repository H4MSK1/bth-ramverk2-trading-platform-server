import { ApiModelProperty } from '@nestjs/swagger';

export class CreateStockDTO {
  @ApiModelProperty()
  productId: number;

  @ApiModelProperty()
  rate: number;

  @ApiModelProperty()
  variance: number;
}

export class UpdateStockDTO {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  rate: number;

  @ApiModelProperty()
  variance: number;
}

export class BuyOrSellStockDTO {
  @ApiModelProperty({ description: 'Stock ID' })
  stockId: number;

  @ApiModelProperty({ description: 'Number of stocks to buy/sell' })
  amount: number;
}
