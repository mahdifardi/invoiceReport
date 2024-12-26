import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("Invoices")
export class InvoiceEntity {
  @ObjectIdColumn()
  _id!: Object;

  @PrimaryGeneratedColumn("uuid")
  reference!: string;

  @Column()
  customer!: string;

  @Column({ default: 0 })
  amount!: number;

  @Column({ type: "array" })
  items!: { sku: string; qt: number }[];

  @CreateDateColumn()
  createdAt!: Date;
}
