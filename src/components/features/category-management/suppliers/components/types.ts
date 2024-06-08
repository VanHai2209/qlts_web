import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const SupplierInputSchema = z.object({
  name: z.string().min(1, {
    message: notEmptyMessage("Tên"),
  }),
  phone_number: z.string().min(1, {
    message: notEmptyMessage("Số điện thoại"),
  }),
  email: z
    .string()
    .email({
      message: "Email không hợp lệ",
    })
    .min(1, {
      message: notEmptyMessage("Email"),
    }),

  address: z.string().min(1, {
    message: notEmptyMessage("Địa chỉ"),
  }),
});

export type SupplierInputType = z.infer<typeof SupplierInputSchema>;

export const SupplierFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type SupplierFilterType = z.infer<typeof SupplierFilterSchema>;
