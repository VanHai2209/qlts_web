"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { SpecialInputSchema, SpecialInputType } from "./types";

import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { IManager } from "@/libs/types/category";
import { ISpecialAsset } from "@/libs/types/plan";
import { STATUS_ASSET } from "@/libs/utils/constants";

export const SpecialForm = () => {
  const { id } = useParams();

  const isEdit = !!id;

  const { data: users } = useQuery<IManager[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await request.get("/asset-management/special/users");
      return res.data;
    },
  });

  const { data } = useQuery<ISpecialAsset>({
    queryKey: ["special", id],
    queryFn: async () => {
      const res = await request.get(`/asset-management/special/${id}`);
      return res.data;
    },
    enabled: isEdit,
  });

  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/asset-management/special",
    queryKey: "special",
    id: data?.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SpecialInputType>({
    resolver: zodResolver(SpecialInputSchema),
    defaultValues: {
      user_id: "",
      car_manufacturer: "",
      manufacture_country: "",
      name: "",
      purpose_use: "",
      quantity: "",
      status: "",
      type_of_vehicle: "",
    },
  });

  console.log(errors);

  useEffect(() => {
    if (data) {
      setValue("user_id", data.user_id + "");
      setValue("name", data.name);
      setValue("car_manufacturer", data.car_manufacturer);
      setValue("manufacture_country", data.manufacture_country);
      setValue("quantity", data.quantity + "");
      setValue("purpose_use", data.purpose_use);
      setValue("type_of_vehicle", data.type_of_vehicle);
      setValue("status", data.status);
    }
  }, [data, setValue]);

  const onSubmit = async (data: SpecialInputType) => {
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
      <Controller
        name="user_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            withAsterisk
            label={"Người quản lý"}
            value={value}
            onChange={(value) => onChange(value || "")}
            placeholder="Chọn người quản lý"
            data={users?.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            clearable
            error={errors.user_id?.message as string}
          />
        )}
      />

      <Controller
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
        name="quantity"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            type="number"
            label={"Số lượng"}
            placeholder={"Nhập số lượng"}
            value={value}
            onChange={onChange}
            error={errors.quantity?.message as string}
          />
        )}
      />

      <Controller
        name="type_of_vehicle"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Loại xe"}
            placeholder={"Nhập loại xe"}
            value={value}
            onChange={onChange}
            error={errors.type_of_vehicle?.message as string}
          />
        )}
      />

      <Controller
        name="purpose_use"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Mục đích sử dụng"}
            placeholder={"Nhập mục đích sử dụng"}
            value={value}
            onChange={onChange}
            error={errors.purpose_use?.message as string}
          />
        )}
      />

      <Controller
        name="car_manufacturer"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Hãng sản xuất"}
            placeholder={"Nhập hãng sản xuất"}
            value={value}
            onChange={onChange}
            error={errors.car_manufacturer?.message as string}
          />
        )}
      />

      <Controller
        name="manufacture_country"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Nước sản xuất"}
            placeholder={"Nhập nước sản xuất"}
            value={value}
            onChange={onChange}
            error={errors.manufacture_country?.message as string}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            withAsterisk
            label={"Tình trạng"}
            placeholder={"Nhập Tình trạng"}
            value={value}
            onChange={(value) => onChange(value || "")}
            data={Object.entries(STATUS_ASSET)?.map((item) => ({
              value: item[0] + "",
              label: item[1] + "",
            }))}
            clearable
            error={errors.status?.message as string}
          />
        )}
      />

      <Button type="submit" loading={isSubmitting} fullWidth variant="filled">
        {isEdit ? "Cập nhật" : "Thêm"}
      </Button>
    </Box>
  );
};
