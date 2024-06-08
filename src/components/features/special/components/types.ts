import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";
export const SpecialInputSchema = z.object({
  user_id: z.string().min(1, {
    message: notEmptyMessage("Người lên kế hoạch"),
  }),
  name: z.string().min(1, {
    message: notEmptyMessage("Tên"),
  }),
  manufacture_country: z.string().min(1, {
    message: notEmptyMessage("Nước sản xuất"),
  }),
  car_manufacturer: z.string().min(1, {
    message: notEmptyMessage("Hãng sản xuất"),
  }),
  quantity: z.string().min(1, {
    message: notEmptyMessage("Số lượng"),
  }),
  type_of_vehicle: z.string().min(1, {
    message: notEmptyMessage("Loại xe"),
  }),
  purpose_use: z.string().min(1, {
    message: notEmptyMessage("Mục đích sử dụng"),
  }),
  status: z.string().min(1, {
    message: notEmptyMessage("Trạng thái"),
  }),
});

export type SpecialInputType = z.infer<typeof SpecialInputSchema>;

export const SpecialFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type SpecialFilterType = z.infer<typeof SpecialFilterSchema>;
