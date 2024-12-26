import http from "http";
import { ServiceFactory } from "../../src/invoice-creation/utility/ServiceFactory";
import { createTestDb } from "../../src/invoice-creation/utility/test-db";
import { makeApp } from "../../src/api";
import request from "supertest";

describe("User route test suite", () => {
  let app: http.Server;
  let serviceFactory: ServiceFactory;

  beforeEach(async () => {
    const dataSource = await createTestDb();
    serviceFactory = new ServiceFactory(dataSource);
    app = makeApp(dataSource, serviceFactory.getInvoiceHandler());
  });

  describe("create invoice", () => {
    it("should create a invoice in database", async () => {
      await request(app)
        .post("/api/invoices/")
        .send({
          customer: "njmn",
          amount: 565,
          items: [
            {
              sku: "ce6b5a86-420d-4ce4-aba1-cfe652af512e",
              qt: 20,
            },
            {
              sku: "aa485372-880a-4015-b09e-c5672055e332",
              qt: 37,
            },
          ],
        })
        .expect(200);
    });
  });

  describe("retrive invoice", () => {
    it("should retrive a invoice from database", async () => {
      const response = await request(app)
        .post("/api/invoices/")
        .send({
          customer: "njmn",
          amount: 565,
          items: [
            {
              sku: "ce6b5a86-420d-4ce4-aba1-cfe652af512e",
              qt: 20,
            },
            {
              sku: "aa485372-880a-4015-b09e-c5672055e332",
              qt: 37,
            },
          ],
        })
        .expect(200);

      const retrieveUrl = "/api/invoices/" + response.body._id;
      console.log(retrieveUrl);
      await request(app).get(retrieveUrl).send().expect(200);
    });
  });

  describe("retrive all invoices", () => {
    it("should retrive a list of invoice from database", async () => {
      let testCount = 3;
      while (testCount > 0) {
        await request(app)
          .post("/api/invoices/")
          .send({
            customer: "njmn",
            amount: 565,
            items: [
              {
                sku: "ce6b5a86-420d-4ce4-aba1-cfe652af512e",
                qt: 20,
              },
              {
                sku: "aa485372-880a-4015-b09e-c5672055e332",
                qt: 37,
              },
            ],
          })
          .expect(200);

        testCount--;
      }

      const response = await request(app)
        .get("/api/invoices/")
        .send()
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
