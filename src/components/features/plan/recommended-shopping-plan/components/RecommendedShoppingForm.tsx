"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  RecommendedShoppingInputType,
  RecommendedShoppingInputSchema,
} from "./types";

import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { IRecommendPlans } from "@/libs/types/plan";
import { IDepartment, ISupplier } from "@/libs/types/category";
import { DateInput } from "@mantine/dates";
import { STATUS, STATUS_ASSET_OBJ } from "@/libs/utils/constants";

export const RecommendedShoppingForm = () => {
  const { id } = useParams();

  const isEdit = !!id;

  const { data: departments } = useQuery<IDepartment[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await request.get("/category-management/departments");
      return res.data.data;
    },
  });

  const { data: suppliers } = useQuery<ISupplier[]>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const res = await request.get("/category-management/suppliers");
      return res.data.data;
    },
  });

  const { data } = useQuery<IRecommendPlans>({
    queryKey: ["recommended-shopping", id],
    queryFn: async () => {
      const res = await request.get(`/plan/recommended-shopping/${id}`);
      return res.data;
    },
    enabled: isEdit,
  });

  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/plan/recommended-shopping",
    queryKey: "recommended-shopping",
    id: data?.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RecommendedShoppingInputType>({
    resolver: zodResolver(RecommendedShoppingInputSchema),
    defaultValues: {
      department_id: "",
      implemention_date: new Date(),
      petition_date: new Date(),
      asset_name: "",
      supplier_id: "",
      description_plan: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("implemention_date", new Date(data.implemention_date));
      setValue("petition_date", new Date(data.petition_date));
      setValue("department_id", data.department_id + "");
      setValue("asset_name", data.RecommendPlanAsset.asset_name);
      setValue("supplier_id", data.RecommendPlanAsset.supplier_id + "");
      setValue("description_plan", data.description_plan);
    }
  }, [data, setValue]);

  const onSubmit = async (data: RecommendedShoppingInputType) => {
    mutateAsync(data);
  };

  if (data?.status !== "PENDING" && isEdit) {
    return <div>Kiến nghị {STATUS[data?.status as keyof typeof STATUS]}</div>;
  }

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
          />
        )}
      />

      <Controller
        name="implemention_date"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateInput
            withAsterisk
            label={"Ngày thực hiện"}
            placeholder={"Nhập ngày thực hiện"}
            value={value}
            onChange={onChange}
            error={errors.implemention_date?.message as string}
          />
        )}
      />

      <Controller
        name="petition_date"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateInput
            withAsterisk
            label={"Ngày kiến nghị"}
            placeholder={"Nhập ngày kiến nghị"}
            value={value}
            onChange={onChange}
            error={errors.petition_date?.message as string}
          />
        )}
      />

      <Controller
        name="asset_name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Tên tài sản"}
            placeholder={"Nhập tên tài sản"}
            value={value}
            onChange={onChange}
            error={errors.asset_name?.message as string}
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
        name="description_plan"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Mô tả kế hoạch"}
            placeholder={"Nhập mô tả kế hoạch"}
            value={value}
            onChange={onChange}
            error={errors.description_plan?.message as string}
          />
        )}
      />

      <Button type="submit" loading={isSubmitting} fullWidth variant="filled">
        {isEdit ? "Cập nhật" : "Thêm"}
      </Button>
    </Box>
  );
};
