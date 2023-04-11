import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from '../../entities/clients.entity';
import axios, { AxiosInstance } from "axios";
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ClientsService {
  protected readonly axiosInstance: AxiosInstance
  protected readonly customerPartnerId: string;
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    configService: ConfigService
  ) {
    this.axiosInstance = axios.create({
        baseURL: configService.get("b54_API"),
        headers: {
            Authorization: process.env.b54_API_KEY,
            "Content-Type": 'application/json'
        }
    })
    this.customerPartnerId = process.env.b54_CUSTOMER_PARTNER_ID
  }

  async create(createClientDto: CreateClientDto) {
    try {
      const {id_type: unique_id_type, id_value: unique_id, ...clientData} = createClientDto
      const client = await this.clientRepository.findOne({where: {
        id_type: unique_id_type, id_value: unique_id,
      }})
      if (client) {
        return client
      } else {
        let result = await this.axiosInstance.post(`customer_partners/${this.customerPartnerId}/customers`, {
          unique_id_type,
          unique_id,
          ...clientData
        })
        if(result?.data?.status != 'success') throw new HttpException('unable to create customer', HttpStatus.INTERNAL_SERVER_ERROR)
        let newClient = this.clientRepository.create(createClientDto)
        return await this.clientRepository.save(newClient);
      }
    } catch(error) {
      return error.message
    }
  }

  async findAll() {
    return await this.clientRepository.find({});
  }

  async findOne(id: number) {
    return await this.clientRepository.findOne({where: {id}})
  }

  async remove(id: number) {
    return await this.clientRepository.delete(id)
  }
}