"use client";

import { request } from "@/libs/request";
import { Grid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import { ILiquidationAsset } from "@/libs/types/plan";

export const LiquidationDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<ILiquidationAsset>({
    queryKey: ["liquidation-asset", id],
    queryFn: async () => {
      const res = await request.get(`/asset-management/liquidation/${id}`);
      return res.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid>
          <Grid.Col span={6}>
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin người lên kế hoạch
            </Text>

            {data?.User ? (
              <>
                <Text>Mã quản lý: {data?.User?.id}</Text>
                <Text>Quản lý: {data?.User?.name}</Text>
                <Text>Email: {data?.User?.email}</Text>
              </>
            ) : (
              <Text>...</Text>
            )}
          </Grid.Col>

          <Grid.Col span={6}>
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin thanh lý
            </Text>

            <Text>Tên tài sản: {data?.Asset?.name}</Text>
            <Text>Nhà cung cấp: {data?.Asset?.Supplier?.name}</Text>
            {data?.implemention_date && (
              <Text>
                Ngày thực hiện:{" "}
                {format(new Date(data.implemention_date), "dd/MM/yyyy")}
              </Text>
            )}
            {data?.petition_date && (
              <Text>
                Ngày lên kế hoạch:{" "}
                {format(new Date(data.petition_date), "dd/MM/yyyy")}
              </Text>
            )}

            <Text>Số lượng: {data?.quantity}</Text>
            <Text>Giá gốc: {data?.original_price}</Text>
            <Text>Giá thanh lý: {data?.liquidation_price}</Text>
            <Text>Đơn vị mua tài sản: {data?.asset_purchasing_unit}</Text>
            <Text>Mô tả kế hoạch: {data?.description_plan}</Text>
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
};
