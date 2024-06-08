import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const ShoppingInputSchema = z.object({
  user_id: z.string().min(1, {
    message: notEmptyMessage("Người lên kế hoạch"),
  }),
  petition_date: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày lên kế hoạch"),
  }),
  implemention_date: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày thực hiện"),
  }),
  asset_name: z.string().min(1, {
    message: notEmptyMessage("Tên tài sản"),
  }),
  supplier_id: z.string().min(1, {
    message: notEmptyMessage("Nhà cung cấp"),
  }),
  quantity: z.string().min(1, {
    message: notEmptyMessage("Số lượng"),
  }),
  description_plan: z.string().min(1, {
    message: notEmptyMessage("Mô tả kế hoạch"),
  }),
});

export type ShoppingInputType = z.infer<typeof ShoppingInputSchema>;

export const ShoppingFilterSchema = z.object({
  id: z.string().optional(),
  implemention_date: z.date().optional(),
  petition_date: z.date().optional(),
});

export type ShoppingFilterType = z.infer<typeof ShoppingFilterSchema>;
