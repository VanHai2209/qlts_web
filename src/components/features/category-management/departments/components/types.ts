import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const DepartmentInputSchema = z.object({
  name: z.string().min(1, {
    message: notEmptyMessage("Tên"),
  }),
  address: z.string().min(1, {
    message: notEmptyMessage("Địa chỉ"),
  }),
  status: z.string().min(1, {
    message: notEmptyMessage("Trạng thái"),
  }),
});

export type DepartmentInputType = z.infer<typeof DepartmentInputSchema>;

export const DepartmentFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
});

export type DepartmentFilterType = z.infer<typeof DepartmentFilterSchema>;
