import { Injectable } from '@nestjs/common';
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

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      // connect to creat payment endpoint here, Not sure we have one
      const paymentData: Payment =
        this.paymentRepository.create(createPaymentDto);
      await this.paymentRepository.save(paymentData);
      return paymentData;
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
