// import { DataSource, Repository } from "typeorm";
// import { InvoiceEntity } from "./entity/invoice.entity";
// import { CreateInvoice, Invoice } from "./model/invoice.model";

// export class InvoiceRepository {
//   private invoiceRepo: Repository<InvoiceEntity>;

//   constructor(appDataSource: DataSource) {
//     this.invoiceRepo = appDataSource.getRepository(InvoiceEntity);
//   }

//   public async create(invoice: CreateInvoice): Promise<Invoice> {
//     return this.invoiceRepo.save({
//       customer: invoice.customer,
//       amount: invoice.amount,
//       items: invoice.items,
//     });
//   }
// }

import { DataSource, Repository } from "typeorm";
import { InvoiceEntity } from "./entity/invoice.entity";
import { CreateInvoice, Invoice } from "./model/invoice.model";
import { ObjectId } from "mongodb";

export class InvoiceRepository {
  private invoiceRepo: Repository<InvoiceEntity>;

  constructor(appDataSource: DataSource) {
    this.invoiceRepo = appDataSource.getRepository(InvoiceEntity);
  }

  public async create(invoice: CreateInvoice): Promise<Invoice> {
    const newInvoice = this.invoiceRepo.create({
      customer: invoice.customer,
      amount: invoice.amount,
      items: invoice.items,
    });

    return await this.invoiceRepo.save(newInvoice);
  }

  public async getInvoiceById(
    invoiceIdObj: ObjectId
  ): Promise<InvoiceEntity | null> {
    const invoice = await this.invoiceRepo.findOne({
      where: {
        _id: invoiceIdObj,
      },
    });

    return invoice;
  }

  public async getInvoices(): Promise<Invoice[]> {
    const invoices = await this.invoiceRepo.find({});

    return invoices;
  }
}
