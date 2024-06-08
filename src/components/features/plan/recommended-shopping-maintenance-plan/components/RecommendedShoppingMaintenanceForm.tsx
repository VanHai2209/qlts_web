"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  RecommendedShoppingMaintenanceInputSchema,
  RecommendedShoppingMaintenanceInputType,
} from "./types";

import { IAsset, IDepartment, ISupplier } from "@/libs/types/category";
import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { IRecommendPlans } from "@/libs/types/plan";

import { DateInput } from "@mantine/dates";
import { STATUS } from "@/libs/utils/constants";

export const RecommendedShoppingMaintenanceForm = () => {
  const { id } = useParams();

  const isEdit = !!id;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RecommendedShoppingMaintenanceInputType>({
    resolver: zodResolver(RecommendedShoppingMaintenanceInputSchema),
    defaultValues: {
      department_id: "",
      implemention_date: new Date(),
      petition_date: new Date(),
      asset_id: "",
      description_plan: "",
    },
  });

  const { data: departments } = useQuery<IDepartment[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await request.get("/category-management/departments");
      return res.data.data;
    },
  });

  const { data: assets } = useQuery<IAsset[]>({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await request.get("/category-management/assets");
      return res.data.data;
    },
  });

  const departmentWatch = useWatch({
    control: control,
    name: "department_id",
  });

  const assetOptions = useMemo(() => {
    return assets?.filter(
      (asset) => asset?.Department?.id == Number(departmentWatch || 0)
    );
  }, [assets, departmentWatch]);

  const { data } = useQuery<IRecommendPlans>({
    queryKey: ["recommended-shopping-maintenance", id],
    queryFn: async () => {
      const res = await request.get(
        `/plan/recommended-shopping-maintenance/${id}`
      );
      return res.data;
    },
    enabled: isEdit,
  });

  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/plan/recommended-shopping-maintenance",
    queryKey: "recommended-shopping-maintenance",
    id: data?.id,
  });

  useEffect(() => {
    if (data) {
      setValue("implemention_date", new Date(data.implemention_date));
      setValue("petition_date", new Date(data.petition_date));
      setValue("department_id", data.department_id + "");
      setValue(
        "asset_id",
        assetOptions?.find(
          (item) => item.name == data.RecommendPlanAsset?.asset_name
        )?.id + ""
      );
      setValue("description_plan", data.description_plan);
    }
  }, [assetOptions, data, setValue]);

  const onSubmit = async (data: RecommendedShoppingMaintenanceInputType) => {
    const asset = assets?.find((item) => item.id == Number(data.asset_id));

    console.log(asset);

    mutateAsync({
      ...data,
      asset_name: asset?.name,
      supplier_id: asset?.supplier_id,
    });
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
        name="asset_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            withAsterisk
            label={"Tài sản"}
            value={value}
            onChange={(value) => onChange(value || "")}
            placeholder="Chọn tài sản"
            data={assetOptions?.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            clearable
            error={errors.asset_id?.message as string}
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
