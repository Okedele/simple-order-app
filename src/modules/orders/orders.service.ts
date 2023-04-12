import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderType } from '../../utils/types';
import { Order } from '../../entities/orders.entity'
import { Client } from '../../entities/clients.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
const randomstring = require("randomstring")

@Injectable()
export class OrdersService {
  constructor (
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Client) private clientRepository: Repository<Client>
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const randomString = randomstring.generate({ length: 16, charset: 'alphanumeric' })
    const margin = createOrderDto.amount * Number(process.env.MARGIN_INCREASE)
    let body:CreateOrderType = {
      ...createOrderDto,
      amount_payable: createOrderDto.amount + margin,
      amount_outstanding: createOrderDto.amount + margin,
      reference: `simple-order-${randomString}`
    };
    const client = await this.clientRepository.findOne({ where: { id: body.client_id } });
    if (client) throw new HttpException('Client does not exist', 400);
    await this.registerTransaction(
      body,
      {
        first_name: client.first_name,
        last_name: client.last_name,
        contact_number: client.contact_number,
        id_type: client.id_type,
        id_value: client.id_value,
      },
    )
    const order =  this.orderRepository.create(body)
    await this.orderRepository.save(order)
    return order;
    // return 'This action adds a new order';
  }

  async findAll() {
    const users = await this.orderRepository.find();
    return users; //`This action returns all orders`;
  }

  async findOne(id: number) {
    const user = await this.orderRepository.findOne({ where: { id: id } });
    return user; //`This action returns a #${id} order`;
  }

  async registerTransaction (details: CreateOrderType, client) {
    try {

      const payload = {
        customer_partner_id: process.env.B54_CUSTOMER_PARTER_ID,
        sector: 'Lender',
        transactions: [
          {
            client,
            transaction_reference: details.reference,
            disbursement_date: details.order_date,
            expected_payment_date: details.expected_payment_date,
            reason: 'N/A',
            amount_payable: details.amount_payable,
            financier: 'Others',
          }
        ],
        financed_transactions: [
          {
            transaction_reference: details.reference,
            amount: details.amount,
            payments: [
              {
                disbursement_date: details.order_date,
                expected_payment_date: details.expected_payment_date,
                amount: details.amount,
              }
            ],
          }
        ]
      }
      await axios.post(
        `${process.env.B54_API}/transactions/register`,
        payload,
        {
          headers: {
            'Authorization': process.env.B54_APP_KEY 
          }
        }
      );
    } catch (error) {
      return error
    }
  }
}
