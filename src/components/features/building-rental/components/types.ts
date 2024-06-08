import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const BuildingRentalInputSchema = z.object({
  // name: z.string().min(1, {
  //   message: notEmptyMessage("Tên"),
  // }),
  // location_room: z.string().min(1, {
  //   message: notEmptyMessage("Vị trí phòng"),
  // }),
  department_id: z.string().min(1, {
    message: notEmptyMessage("Phòng ban"),
  }),
  size_room: z.string().min(1, {
    message: notEmptyMessage("Kích thước phòng"),
  }),
  renter_information: z.string().min(1, {
    message: notEmptyMessage("Thông tin người thuê"),
  }),
  rental_date_start: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày thuê bắt đầu"),
  }),
  rental_date_end: z.date().min(new Date(0), {
    message: notEmptyMessage("Ngày thuê kết thúc"),
  }),
  rental_price: z.string().min(1, {
    message: notEmptyMessage("Giá thuê"),
  }),
});

export type BuildingRentalInputType = z.infer<typeof BuildingRentalInputSchema>;

export const BuildingRentalFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type BuildingRentalFilterType = z.infer<
  typeof BuildingRentalFilterSchema
>;
