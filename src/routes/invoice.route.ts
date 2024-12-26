import { Router } from "express";
import { handleExpress } from "../utility/handle-express";
import { InvoiceHnadler } from "../invoiceHnadler";
import { invoiceDto } from "../dto/invoice.dto";

export const makeInvoiceRouter = (invoiceHnadler: InvoiceHnadler) => {
  const app = Router();

  app.post("/", (req, res) => {
    const dto = invoiceDto.parse(req.body);
    handleExpress(res, () => invoiceHnadler.createInvoice(dto));
  });

  app.get("/", (req, res) => {
    handleExpress(res, () => invoiceHnadler.getInvoices());
  });

  app.get("/:id", (req, res) => {
    const invoiceId = req.params.id;

    handleExpress(res, () => invoiceHnadler.getInvoiceById(invoiceId));
  });

  return app;
};
