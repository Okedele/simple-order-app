import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Type {
  BVN = 'bvn',
  NIN = 'nin',
  DRIVERS_LICENSE = 'drivers_license',
  RC_NUMBER = 'rc_number',
}

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  contact_number: string;

  @Column({ type: 'enum', enum: Type })
  id_type: Type;

  @Column()
  id_value: string;

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
