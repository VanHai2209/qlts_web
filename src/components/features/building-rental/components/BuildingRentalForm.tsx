"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Select, Text, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BuildingRentalInputSchema, BuildingRentalInputType } from "./types";

import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { IBuildingRental } from "@/libs/types/plan";
import { DateInput } from "@mantine/dates";
import { IDepartment } from "@/libs/types/category";

export const BuildingRentalForm = () => {
  const { id } = useParams();

  const isEdit = !!id;

  const { data } = useQuery<IBuildingRental>({
    queryKey: ["building-rental", id],
    queryFn: async () => {
      const res = await request.get(`/asset-management/building-rental/${id}`);
      return res.data;
    },
    enabled: isEdit,
  });

  const { data: departments } = useQuery<IDepartment[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await request.get("/category-management/departments", {
        params: {
          status: isEdit ? "" : "READY_TO_USE",
        },
      });
      return res.data.data;
    },
  });

  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/asset-management/building-rental",
    queryKey: "building-rental",
    id: data?.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<BuildingRentalInputType>({
    resolver: zodResolver(BuildingRentalInputSchema),
    defaultValues: {
      // name: "",
      // location_room: "",
      department_id: "",
      rental_date_end: new Date(),
      rental_date_start: new Date(),
      renter_information: "",
      size_room: "",
      rental_price: "",
    },
  });

  useEffect(() => {
    if (data) {
      // setValue("name", data.name);
      // setValue("location_room", data.location_room);
      setValue("department_id", data.department_id + "");
      setValue("size_room", data.size_room + "");
      setValue("renter_information", data.renter_information);
      setValue("rental_date_start", new Date(data.rental_date_start));
      setValue("rental_date_end", new Date(data.rental_date_end));
      setValue("rental_price", data.rental_price + "");
    }
  }, [data, setValue]);

  const onSubmit = async (data: BuildingRentalInputType) => {
    mutateAsync(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{
        marginTop: 3,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      {/* <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Tên"}
            placeholder={"Nhập tên"}
            value={value}
            onChange={onChange}
            error={errors.name?.message as string}
          />
        )}
      />

      <Controller
        name="location_room"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Địa điểm phòng"}
            placeholder={"Nhập địa điểm phòng"}
            value={value}
            onChange={onChange}
            error={errors.location_room?.message as string}
          />
        )}
      /> */}

      <Controller
        name="department_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            withAsterisk
            label={"Phòng ban"}
            value={value}
            onChange={(value) => onChange(value || "")}
            placeholder="Chọn phòng ban"
            data={departments?.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            clearable
            error={errors.department_id?.message as string}
            disabled={isEdit}
          />
        )}
      />

      <Controller
        name="size_room"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            type="number"
            label={"Diện tích (m2)"}
            placeholder={"Nhập diện tích"}
            value={value}
            onChange={onChange}
            error={errors.size_room?.message as string}
          />
        )}
      />

      <Controller
        name="renter_information"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Thông tin người thuê"}
            placeholder={"Nhập thông tin người thuê"}
            value={value}
            onChange={onChange}
            error={errors.renter_information?.message as string}
          />
        )}
      />

      <Controller
        name="rental_date_start"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateInput
            withAsterisk
            label={"Ngày thuê bắt đầu"}
            value={value}
            onChange={onChange}
            error={errors.rental_date_start?.message as string}
          />
        )}
      />

      <Controller
        name="rental_date_end"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateInput
            withAsterisk
            label={"Ngày thuê kết thúc"}
            value={value}
            onChange={onChange}
            error={errors.rental_date_end?.message as string}
          />
        )}
      />

      <Controller
        name="rental_price"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            type="number"
            label={"Giá thuê"}
            placeholder="Nhập giá thuê"
            value={value}
            onChange={onChange}
            error={errors.rental_price?.message as string}
          />
        )}
      />

      <Button type="submit" loading={isSubmitting} fullWidth variant="filled">
        {isEdit ? "Cập nhật" : "Thêm"}
      </Button>
    </Box>
  );
};
