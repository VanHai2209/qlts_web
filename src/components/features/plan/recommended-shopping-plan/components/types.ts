import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const RecommendedShoppingInputSchema = z.object({
  department_id: z.string().min(1, {
    message: notEmptyMessage("Phòng ban"),
  }),
  implemention_date: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày thực hiện"),
  }),
  petition_date: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày kiến nghị"),
  }),
  asset_name: z.string().min(1, {
    message: notEmptyMessage("Tên tài sản"),
  }),
  supplier_id: z.string().min(1, {
    message: notEmptyMessage("Nhà cung cấp"),
  }),
  description_plan: z.string().min(1, {
    message: notEmptyMessage("Mô tả kế hoạch"),
  }),
});

export type RecommendedShoppingInputType = z.infer<
  typeof RecommendedShoppingInputSchema
>;

export const RecommendedShoppingFilterSchema = z.object({
  id: z.string().optional(),
  department_id: z.string().optional(),
  implemention_date: z.date().optional(),
  petition_date: z.date().optional(),
});

export type RecommendedShoppingFilterType = z.infer<
  typeof RecommendedShoppingFilterSchema
>;
