"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Select, TextInput } from "@mantine/core";

import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { AssetInputSchema, AssetInputType } from "./types";

import {
  IAsset,
  IDepartment,
  ISupplier,
  UserType,
} from "@/libs/types/category";
import { DateInput } from "@mantine/dates";
import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { useParams } from "next/navigation";
import { STATUS_ASSET } from "@/libs/utils/constants";
import { IBaseMaster } from "@/libs/types/common";

export const AssetForm = () => {
  const { id } = useParams();

  const isEdit = !!id;

  const { data } = useQuery<IAsset>({
    queryKey: ["assets", id],
    queryFn: async () => {
      const res = await request.get(`/category-management/assets/${id}`);
      return res.data;
    },
    enabled: isEdit,
  });

  const { data: categories } = useQuery<IBaseMaster[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await request.get("/category-management/categories");
      return res.data;
    },
  });

  const { data: suppliers } = useQuery<ISupplier[]>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const res = await request.get("/category-management/suppliers");
      return res.data.data;
    },
  });

  const { data: departments } = useQuery<IDepartment[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await request.get("/category-management/departments");
      return res.data.data;
    },
  });

  const { data: users } = useQuery<UserType[]>({
    queryKey: ["managers-workers"],
    queryFn: async () => {
      const res = await request.get("/category-management/managers-workers");
      return res.data.data;
    },
  });

  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/category-management/assets",
    queryKey: "assets",
    id: data?.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setValue,
    resetField,
  } = useForm<AssetInputType>({
    resolver: zodResolver(AssetInputSchema),
    defaultValues: {
      name: "",
      asset_code: "",
      entry_time: undefined,
      entry_price: "",
      supplier_id: "",
      department_id: "",
      depreciation_rate: "",
      condition: "",
      status: "",
      category_id: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("asset_code", data.asset_code);
      setValue("entry_time", new Date(data.entry_time));
      setValue("entry_price", data.entry_price + "");
      setValue("depreciation_rate", data.depreciation_rate + "");
      setValue("supplier_id", data.supplier_id ? data.supplier_id + "" : "");
      setValue(
        "department_id",
        data.department_id ? data.department_id + "" : ""
      );
      setValue("user_id", data.user_id ? data.user_id + "" : "");
      setValue("condition", data.condition);
      setValue("status", data.status);
    }
  }, [data, setValue]);

  const departmentWatch = useWatch({
    control,
    name: "department_id",
  });

  const userWatch = useWatch({
    control,
    name: "user_id",
  });

  const statusWatch = useWatch({
    control,
    name: "status",
  });

  useEffect(() => {
    if (statusWatch == "MAINTENANCE") return;

    if (departmentWatch == "" && userWatch == "") {
      setValue("status", "READY_TO_USE");
    } else {
      setValue("status", "USED");
    }
  }, [departmentWatch, setValue, statusWatch, userWatch]);

  const onSubmit = async (data: AssetInputType) => {
    mutateAsync({
      ...data,
    });
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
        name="asset_code"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Mã loại tài sản"}
            placeholder={"Nhập mã loại tài sản"}
            value={value}
            onChange={onChange}
            error={errors.asset_code?.message as string}
          />
        )}
      />

      <Controller
        name="entry_time"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateInput
            withAsterisk
            label={"Ngày nhập"}
            placeholder={"Nhập ngày nhập"}
            value={value}
            onChange={onChange}
            error={errors.entry_time?.message as string}
            // minDate={new Date()}
          />
        )}
      />

      <Controller
        name="entry_price"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            type="number"
            label={"Giá nhập"}
            placeholder={"Nhập giá nhập"}
            value={value}
            onChange={onChange}
            error={errors.entry_price?.message as string}
          />
        )}
      />

      <Controller
        name="depreciation_rate"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            type="number"
            label={"Khấu hao"}
            placeholder={"Nhập khấu hao"}
            value={value}
            onChange={onChange}
            error={errors.depreciation_rate?.message as string}
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
            data={Object.entries(STATUS_ASSET)?.map((item) => ({
              value: item[0] + "",
              label: item[1] + "",
            }))}
            clearable
            error={errors.status?.message as string}
          />
        )}
      />

      <Controller
        name="condition"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Tình trạng"}
            placeholder={"Nhập tình trạng"}
            value={value}
            onChange={(value) => onChange(value)}
            error={errors.condition?.message as string}
          />
        )}
      />

      <Controller
        name="category_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            withAsterisk
            label={"Loại tài sản"}
            placeholder={"Nhập loại tài sản"}
            value={value}
            onChange={(value) => onChange(value || "")}
            data={categories?.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            clearable
            error={errors.status?.message as string}
          />
        )}
      />

      <Controller
        name="supplier_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={"Nhà cung cấp"}
            value={value}
            onChange={(value) => onChange(value || "")}
            placeholder="Chọn nhà cung cấp"
            data={suppliers?.map((supplier) => ({
              value: supplier.id + "",
              label: supplier.name,
            }))}
            clearable
            error={errors.supplier_id?.message as string}
          />
        )}
      />

      <Controller
        name="department_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={"Phòng ban sử dụng"}
            value={value || null}
            onChange={(value) => {
              if (value) {
                setValue("user_id", "");
              }

              onChange(value || "");
            }}
            placeholder="Chọn phòng ban"
            data={departments?.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            clearable
            error={errors.department_id?.message as string}
          />
        )}
      />

      <Controller
        name="user_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={"Người sử dụng"}
            value={value || null}
            onChange={(value) => {
              if (value) {
                resetField("department_id");
              }

              onChange(value || "");
            }}
            placeholder="Chọn người sử dụng"
            data={users?.map((item) => ({
              value: item.id + "",
              label: `${item?.role == "MANAGER" ? "QL" : "CN"} - ${item.name}`,
            }))}
            clearable
            error={errors.user_id?.message as string}
          />
        )}
      />

      <Button type="submit" loading={isSubmitting} fullWidth variant="filled">
        {isEdit ? "Cập nhật" : "Thêm"}
      </Button>
    </Box>
  );
};
