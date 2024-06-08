import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const AssetInputSchema = z.object({
  name: z.string().min(1, {
    message: notEmptyMessage("Tên"),
  }),
  // description: z.string().min(1, {
  //   message: notEmptyMessage("Mô tả"),
  // }),
  asset_code: z.string().min(1, {
    message: notEmptyMessage("Mã sản phẩm"),
  }),

  entry_time: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày nhập"),
  }),

  entry_price: z.string().min(1, {
    message: notEmptyMessage("Giá nhập"),
  }),

  depreciation_rate: z.string().min(1, {
    message: notEmptyMessage("Khấu hao"),
  }),
  supplier_id: z.string().min(1, {
    message: notEmptyMessage("Nhà cung cấp"),
  }),
  category_id: z.string().min(1, {
    message: notEmptyMessage("Loại tài sản"),
  }),
  department_id: z.string().optional(),
  user_id: z.string().optional(),

  status: z.string().min(1, {
    message: notEmptyMessage("Trạng thái"),
  }),
  condition: z.string().min(1, {
    message: notEmptyMessage("Tình trạng"),
  }),
});

export type AssetInputType = z.infer<typeof AssetInputSchema>;

export const AssetFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  condition: z.string().optional(),
});

export type AssetFilterType = z.infer<typeof AssetFilterSchema>;
