import { DataSource } from "typeorm";
import { InvoiceEntity } from "../../src/entity/invoice.entity";
import { createTestDb } from "../../src/utility/test-db";
import { ServiceFactory } from "../../src/utility/ServiceFactory";
import { InvoiceService } from "../../src/invoice.service";

describe("MongoDB with TypeORM", () => {
  let dataSource: DataSource;
  let serviceFactory: ServiceFactory;
  let invoiceService: InvoiceService;

  beforeAll(async () => {
    dataSource = await createTestDb();
    serviceFactory = new ServiceFactory(dataSource);
    invoiceService = serviceFactory.getInvoiceService();
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  it("should save and retrieve an invoice", async () => {
    const newInvoice = await invoiceService.createInvoice({
      customer: "test_customer",
      amount: 1000,
      items: [{ sku: "test-sku", qt: 10 }],
    });

    expect(newInvoice).toHaveProperty("_id");
    expect(newInvoice.customer).toBe("test_customer");
    expect(newInvoice.amount).toBe(1000);
    expect(newInvoice.items[0].qt).toBe(10);
    expect(newInvoice.items[0].sku).toBe("test-sku");

    const savedInvoice = await invoiceService.getInvoiceById(
      newInvoice._id.toString()
    );

    expect(savedInvoice).not.toBeNull();
    expect(savedInvoice?.customer).toBe("test_customer");
    expect(savedInvoice?.amount).toBe(1000);
    expect(savedInvoice?.items[0].qt).toBe(10);
    expect(savedInvoice?.items[0].sku).toBe("test-sku");
  });
});
