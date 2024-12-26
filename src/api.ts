import { DataSource } from "typeorm";
import express from "express";
import { errorHandler } from "./invoice-creation/middlewares/error-handler.mmiddleware";
import http from "http";
import cors from "cors";
import { makeInvoiceRouter } from "./invoice-creation/routes/invoice.route";
import { InvoiceHnadler } from "./invoice-creation/invoiceHnadler";

export const makeApp = (
  dataSource: DataSource,
  invoiceHnadler: InvoiceHnadler
) => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
      exposedHeaders: ["set-cookie", "ajax_redirect"],
      preflightContinue: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      optionsSuccessStatus: 200,
    })
  );

  app.use("/api/invoices", makeInvoiceRouter(invoiceHnadler));
  //   app.use("/api/post", makePostRouter(userHandler, postHandler));

  app.use(errorHandler);

  const httpServer = http.createServer(app);

  return httpServer;
};
