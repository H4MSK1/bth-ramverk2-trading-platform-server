import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';

@WebSocketGateway({ namespace: '/api' })
export class StockGateway {
  @WebSocketServer() server: any;

  constructor(private readonly stockService: StockService) {}

  async broadcastStocks(updatePrices: boolean = true) {
    if (updatePrices) {
      await this.stockService.updatePrices();
    }
    const stocks: Stock[] = await this.stockService.findAll();
    this.server.emit('stocks', stocks);
  }
}
