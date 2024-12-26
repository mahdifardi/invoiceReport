export interface SkuSummary {
  sku: string;
  totalQuantity: number;
}

export interface DailySummaryReport {
  totalSales: number;
  skuSummary: SkuSummary[];
}
