"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { SupplierInputSchema, SupplierInputType } from "./types";
import { ISupplier } from "@/libs/types/category";
import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";

interface Props {
  data?: ISupplier;
}

export const SupplierForm = ({ data }: Props) => {
  const isEdit = !!data;
  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/category-management/suppliers",
    queryKey: "suppliers",
    id: data?.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SupplierInputType>({
    resolver: zodResolver(SupplierInputSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("address", data.address);
      setValue("phone_number", data.phone_number);
    }
  }, [data, setValue]);

  const onSubmit = async (data: SupplierInputType) => {
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
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={"Tên"}
            placeholder={"Nhập tên"}
            value={value}
            onChange={onChange}
            error={errors.name?.message as string}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={"Email"}
            placeholder={"Nhập email"}
            value={value}
            onChange={onChange}
            error={errors.email?.message as string}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={"Địa chỉ"}
            placeholder={"Nhập địa chỉ"}
            value={value}
            onChange={onChange}
            error={errors.address?.message as string}
          />
        )}
      />

      <Controller
        name="phone_number"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={"Số điện thoại"}
            placeholder={"Nhập số điện thoại"}
            value={value}
            onChange={onChange}
            error={errors.phone_number?.message as string}
          />
        )}
      />

      <Button type="submit" loading={isSubmitting} fullWidth variant="filled">
        {isEdit ? "Cập nhật" : "Thêm"}
      </Button>
    </Box>
  );
};
