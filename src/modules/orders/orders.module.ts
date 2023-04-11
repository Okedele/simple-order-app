import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/orders.entity'
import { Client } from '../../entities/clients.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Order, Client])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
