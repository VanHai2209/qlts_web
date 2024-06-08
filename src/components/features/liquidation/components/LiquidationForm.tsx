"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { IAsset, IManager } from "@/libs/types/category";
import { DateInput } from "@mantine/dates";
import { ILiquidationAsset } from "@/libs/types/plan";
import {
  LiquidationInputSchema,
  LiquidationInputType,
  calculateLiquidationPrice,
} from "./types";

export const LiquidationForm = () => {
  const { id } = useParams();

  const isEdit = !!id;

  const { data: managers } = useQuery<IManager[]>({
    queryKey: ["managers"],
    queryFn: async () => {
      const res = await request.get("/category-management/managers");
      return res.data.data;
    },
  });

  const { data } = useQuery<ILiquidationAsset>({
    queryKey: ["liquidation", id],
    queryFn: async () => {
      const res = await request.get(`/asset-management/liquidation/${id}`);
      return res.data;
    },
    enabled: isEdit,
  });

  const { data: assets } = useQuery<IAsset[]>({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await request.get("/category-management/assets");

      const filter = res?.data?.data?.filter(
        (item: IAsset) => item.status !== "LIQUIDATION"
      );

      return filter;
    },
  });

  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/asset-management/liquidation",
    queryKey: "liquidation",
    id: data?.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<LiquidationInputType>({
    resolver: zodResolver(LiquidationInputSchema),
    defaultValues: {
      user_id: "",
      implemention_date: new Date(),
      petition_date: new Date(),
      asset_id: "",
      description_plan: "",
      quantity: "1",
      asset_purchasing_unit: "",
      liquidation_price: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("user_id", data.user_id + "");
      setValue("implemention_date", new Date(data.implemention_date));
      setValue("petition_date", new Date(data.petition_date));
      setValue("description_plan", data.description_plan);
      setValue("quantity", data.quantity + "");

      setValue("asset_id", data.asset_id + "");
      setValue("liquidation_price", data.liquidation_price + "");
      setValue("asset_purchasing_unit", data.asset_purchasing_unit + "");
    }
  }, [data, setValue]);

  const onSubmit = async (data: LiquidationInputType) => {
    mutateAsync(data);
  };

  const implementionDateWatch = useWatch({
    control,
    name: "implemention_date",
  });

  const assetIdWatch = useWatch({
    control,
    name: "asset_id",
  });

  useEffect(() => {
    const asset = assets?.find((item) => item.id == Number(assetIdWatch));

    if (asset) {
      const liquidationPrice = calculateLiquidationPrice({
        depreciation_rate: asset?.depreciation_rate,
        entry_price: asset?.entry_price,
        entry_time: asset?.entry_time,
        implemention_date: implementionDateWatch.toString(),
      });

      setValue("liquidation_price", liquidationPrice + "");
    }
  }, [assetIdWatch, assets, implementionDateWatch, setValue]);

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
            label={"Người lên kế hoạch"}
            value={value}
            onChange={(value) => onChange(value || "")}
            placeholder="Chọn người lên kế hoạch"
            data={managers?.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            clearable
            error={errors.user_id?.message as string}
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
            // minDate={new Date()}
          />
        )}
      />

      <Controller
        name="petition_date"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateInput
            withAsterisk
            label={"Ngày lên kế hoạch"}
            placeholder={"Nhập ngày lên kế hoạch"}
            value={value}
            onChange={onChange}
            error={errors.petition_date?.message as string}
            // minDate={new Date()}
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
            data={assets?.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            clearable
            error={errors.asset_id?.message as string}
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
            disabled
          />
        )}
      />

      <Controller
        name="liquidation_price"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            type="number"
            label={"Giá thanh lý"}
            placeholder={"Nhập giá thanh lý"}
            value={Math.round(Number(value)).toString()}
            onChange={onChange}
            error={errors.liquidation_price?.message as string}
            disabled
          />
        )}
      />

      <Controller
        name="asset_purchasing_unit"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            withAsterisk
            label={"Đơn vị mua tài sản"}
            placeholder={"Nhập đơn vị mua tài sản"}
            value={value}
            onChange={onChange}
            error={errors.asset_purchasing_unit?.message as string}
          />
        )}
      />

      <Button type="submit" loading={isSubmitting} fullWidth variant="filled">
        {isEdit ? "Cập nhật" : "Thêm"}
      </Button>
    </Box>
  );
};
