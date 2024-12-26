import { Item } from "./item.model";

export interface Invoice {
  customer: string;
  amount: number;
  reference: string;
  items: { sku: string; qt: number }[];
}

export interface CreateInvoice {
  customer: string;
  amount: number;
  items: { sku: string; qt: number }[];
}
