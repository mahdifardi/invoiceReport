import {
  AggregationCursor,
  DataSource,
  MongoRepository,
  Repository,
} from "typeorm";
import { InvoiceEntity } from "./entity/invoice.entity";
import { CreateInvoice, Invoice } from "./model/invoice.model";
import { ObjectId } from "mongodb";
import { getMongoRepository } from "typeorm";
import { DailySummaryReport, SkuSummary } from "../sales-report/report.model";

export class InvoiceRepository {
  private invoiceRepo: Repository<InvoiceEntity>;
  private invoiceRepoAgg: MongoRepository<InvoiceEntity>;

  constructor(appDataSource: DataSource) {
    this.invoiceRepo = appDataSource.getRepository(InvoiceEntity);
    this.invoiceRepoAgg = appDataSource.getRepository(
      InvoiceEntity
    ) as MongoRepository<InvoiceEntity>;
  }

  public async create(invoice: CreateInvoice): Promise<InvoiceEntity> {
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

  public async getDailySummary(
    startOfDay: Date,
    endOfDay: Date
  ): Promise<DailySummaryReport> {
    const pipeline = [
      // Match documents within the date range
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      // Unwind the items array to process each item individually
      {
        $unwind: "$items",
      },

      {
        $group: {
          _id: "$_id",
          totalAmount: { $first: "$amount" },
          totalInvoiceQuantity: { $sum: "$items.qt" },
          items: { $push: "$items" },
        },
      },
      // Unwind items again to distribute the amount proportionally
      {
        $unwind: "$items",
      },
      // Add a proportional sales value for each item
      {
        $addFields: {
          "items.proportionalAmount": {
            $multiply: [
              "$totalAmount",
              { $divide: ["$items.qt", "$totalInvoiceQuantity"] },
            ],
          },
        },
      },
      // Group by SKU to calculate total sales and quantity for each SKU
      {
        $group: {
          _id: "$items.sku",
          totalQuantity: { $sum: "$items.qt" },
          totalSales: { $sum: "$items.proportionalAmount" },
        },
      },
      // Summarize total sales and SKU breakdown
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalSales" },
          skuSummary: {
            $push: {
              sku: "$_id",
              totalQuantity: "$totalQuantity",
            },
          },
        },
      },
    ];

    const result = await this.invoiceRepoAgg.aggregate(pipeline).toArray();

    const [summary] = result as unknown as DailySummaryReport[];

    return summary || { totalSales: 0, skuSummary: [] };
  }
}
