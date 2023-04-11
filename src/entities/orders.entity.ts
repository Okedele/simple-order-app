import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from './clients.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'client_id' })
  client_id: number;

  @Column()
  reference: string;

  @Column({ type: 'float' })
  public amount: number;

  @Column({ type: 'float' })
  public amount_payable: number;

  @Column({ type: 'float', nullable: true })
  public amount_paid: number;

  @Column({ type: 'float' })
  public amount_outstanding: number;

  @Column({ type: 'timestamp' })
  order_date: Date;

  @Column({ type: 'timestamp' })
  expected_payment_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  actual_payment_date: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
