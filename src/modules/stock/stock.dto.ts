export class CreateStockDTO {
  productId: number;
  rate: number;
  variance: number;
}

export class UpdateStockDTO {
  id: number;
  rate: number;
  variance: number;
}

export class BuyOrSellStockDTO {
  stockId: number;
  amount: number;
}
