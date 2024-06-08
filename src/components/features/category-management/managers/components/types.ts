import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const ManagerInputSchema = z.object({
  name: z.string().min(1, {
    message: notEmptyMessage("Tên"),
  }),
  email: z
    .string()
    .min(1, {
      message: notEmptyMessage("Email"),
    })
    .email({
      message: "Email không hợp lệ",
    }),
  phone_number: z.string().min(1, {
    message: notEmptyMessage("Số điện thoại"),
  }),
  address: z.string().min(1, {
    message: notEmptyMessage("Địa chỉ"),
  }),
  department_id: z.string().min(1, {
    message: notEmptyMessage("Phòng ban"),
  }),

  username: z.string().min(1, {
    message: notEmptyMessage("Tên đăng nhập"),
  }),

  password: z.string().min(1, {
    message: notEmptyMessage("Mật khẩu"),
  }),
});

export type ManagerInputType = z.infer<typeof ManagerInputSchema>;

export const ManagerFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type ManagerFilterType = z.infer<typeof ManagerFilterSchema>;
