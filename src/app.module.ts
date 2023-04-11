import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { OrdersModule } from './modules/orders/orders.module';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    OrdersModule,
    ClientsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
