import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  order_reference: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
