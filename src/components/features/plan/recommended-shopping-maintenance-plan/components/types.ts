import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const RecommendedShoppingMaintenanceInputSchema = z.object({
  department_id: z.string().min(1, {
    message: notEmptyMessage("Phòng ban"),
  }),
  implemention_date: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày thực hiện"),
  }),
  petition_date: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày kiến nghị"),
  }),
  asset_id: z.string().min(1, {
    message: notEmptyMessage("Tài sản"),
  }),
  description_plan: z.string().min(1, {
    message: notEmptyMessage("Mô tả kế hoạch"),
  }),
});

export type RecommendedShoppingMaintenanceInputType = z.infer<
  typeof RecommendedShoppingMaintenanceInputSchema
>;

export const RecommendedShoppingMaintenanceFilterSchema = z.object({
  id: z.string().optional(),
  department_id: z.string().optional(),
  implemention_date: z.date().optional(),
  petition_date: z.date().optional(),
});

export type RecommendedShoppingMaintenanceFilterType = z.infer<
  typeof RecommendedShoppingMaintenanceFilterSchema
>;
