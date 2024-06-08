"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DepartmentInputSchema, DepartmentInputType } from "./types";

import { IDepartment } from "@/libs/types/category";
import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";
import { STATUS_DEPARTMENT } from "@/libs/utils/constants";

interface Props {
  data?: IDepartment;
}

export const DepartmentForm = ({ data }: Props) => {
  const isEdit = !!data;

  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/category-management/departments",
    queryKey: "departments",
    id: data?.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<DepartmentInputType>({
    resolver: zodResolver(DepartmentInputSchema),
    defaultValues: {
      name: "",
      address: "",
      status: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("address", data.address);
      setValue("status", data.status);
    }
  }, [data, setValue]);

  const onSubmit = async (data: DepartmentInputType) => {
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
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            withAsterisk
            label={"Trạng thái"}
            placeholder={"Nhập trạng thái"}
            value={value}
            onChange={(value) => onChange(value || "")}
            data={Object.entries(STATUS_DEPARTMENT)?.map((item) => ({
              value: item[0] + "",
              label: item[1] + "",
            }))}
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
