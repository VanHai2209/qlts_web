import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const LiquidationInputSchema = z.object({
  user_id: z.string().min(1, {
    message: notEmptyMessage("Người lên kế hoạch"),
  }),
  petition_date: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày lên kế hoạch"),
  }),
  implemention_date: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày thực hiện"),
  }),
  asset_id: z.string().min(1, {
    message: notEmptyMessage("Tên tài sản"),
  }),
  quantity: z.string().min(1, {
    message: notEmptyMessage("Số lượng"),
  }),
  description_plan: z.string().min(1, {
    message: notEmptyMessage("Mô tả kế hoạch"),
  }),
  asset_purchasing_unit: z.string().min(1, {
    message: notEmptyMessage("Đơn vị mua tài sản"),
  }),
  liquidation_price: z.string().min(1, {
    message: notEmptyMessage("Giá thanh lý"),
  }),
});

export type LiquidationInputType = z.infer<typeof LiquidationInputSchema>;

export const LiquidationFilterSchema = z.object({
  id: z.string().optional(),
  implemention_date: z.date().optional(),
  petition_date: z.date().optional(),
});

export type LiquidationFilterType = z.infer<typeof LiquidationFilterSchema>;

export const calculateLiquidationPrice = ({
  entry_time,
  depreciation_rate,
  entry_price,
  implemention_date,
}: {
  entry_time: string;
  depreciation_rate: number;
  implemention_date: string;
  entry_price: number;
}) => {
  // p1 = p - p*(t*c/30)
  // p is entry_price
  // t is time_used = implemention_date - entry_time
  // c is depreciation_rate
  // 30 is days in month

  console.log({
    entry_time,
    depreciation_rate,
    entry_price,
    implemention_date,
  });
  const timeUsed =
    new Date(implemention_date).getTime() - new Date(entry_time).getTime();

  const daysUsed = timeUsed / (1000 * 3600 * 24);

  const liquidationPrice =
    entry_price - (entry_price * ((daysUsed * depreciation_rate) / 100)) / 30;
  console.log({ daysUsed, liquidationPrice });

  return liquidationPrice;
};
