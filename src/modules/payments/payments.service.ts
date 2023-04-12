import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payments.entity';
import { Repository } from 'typeorm';
import axios, { AxiosInstance } from 'axios';
@Injectable()
export class PaymentsService {
  protected readonly axiosInstance: AxiosInstance;
  protected readonly customerPartnerId: string;
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {
    // Probably need to add this as a global helper/instance
    this.axiosInstance = axios.create({
      baseURL: process.env.b54_API,
      headers: {
        Authorization: process.env.b54_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    this.customerPartnerId = process.env.b54_CUSTOMER_PARTNER_ID;
  }

  async create(createPaymentDto: CreatePaymentDto[]) {
    try {
      const payments = createPaymentDto.map((payment) => ({
        transaction_reference: payment.order_reference,
        amount: payment.amount,
      }));

      const response = await this.axiosInstance.post(`/financing/bulk-payment`, {
        customer_partner_id: this.customerPartnerId,
        payments,
      });

      if (response.data.status !== 'success') {
        throw new HttpException(
          'unable to make payment',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      createPaymentDto.forEach(async (payment) => {
        const paymentData = this.paymentRepository.create(payment);
        await this.paymentRepository.save(paymentData);
      });

      return {
        status: 'success',
        statusCode: 201,
        message: 'Payment has been created successfully.',
        data: [],
      };
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.paymentRepository.find({});
  }

  async findByOrderReference(order_reference: string) {
    return await this.paymentRepository.find({
      where: { order_reference },
    });
  }

  async findOne(id: number) {
    return await this.paymentRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.paymentRepository.delete(id);
  }
}
