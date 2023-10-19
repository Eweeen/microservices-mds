import { Controller, Inject, Post, OnModuleInit, UseGuards, Req } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateOrderResponse, OrderServiceClient, ORDER_SERVICE_NAME, CreateOrderRequest } from './order.pb';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

interface ExtendedRequest extends Request {
  user?: number; // Change 'number' to the actual type of userId if available
}

@Controller('order')
export class OrderController implements OnModuleInit {
  private svc: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createOrder(@Req() req: ExtendedRequest): Promise<Observable<CreateOrderResponse>> {
    const body: CreateOrderRequest = req.body;

    body.userId = req.user as number; // Use 'as' to cast the value

    return this.svc.createOrder(body);
  }
}
