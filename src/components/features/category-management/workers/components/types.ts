import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const WorkerInputSchema = z.object({
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
});

export type WorkerInputType = z.infer<typeof WorkerInputSchema>;

export const WorkerFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type WorkerFilterType = z.infer<typeof WorkerFilterSchema>;
