import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    client_id: number
    
    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsNotEmpty()
    @IsString()
    order_date: string

    @IsNotEmpty()
    @IsString()
    expected_payment_date: string
}
