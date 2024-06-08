"use client";

import { request } from "@/libs/request";
import { Button, Grid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { ISpecialAsset } from "@/libs/types/plan";
import { STATUS_ASSET_OBJ } from "@/libs/utils/constants";

export const BuildingRentalDetail = () => {
  const { id } = useParams();

  const { data, isLoading, refetch } = useQuery<ISpecialAsset>({
    queryKey: ["special-asset", id],
    queryFn: async () => {
      const res = await request.get(`/asset-management/special/${id}`);
      return res.data;
    },
  });

  const handleRevoke = async () => {
    try {
      await request.post(`/asset-management/special/revoke/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid>
          <Grid.Col span={6}>
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin người quản lý
            </Text>

            {data?.User ? (
              <>
                <Text>Mã: {data?.User?.id}</Text>
                <Text>Tên: {data?.User?.name}</Text>
                <Text>Email: {data?.User?.email}</Text>
              </>
            ) : (
              <Text>...</Text>
            )}
          </Grid.Col>

          <Grid.Col span={6}>
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin tài sản đặc thù
            </Text>

            <Text>Tên tài sản: {data?.name}</Text>
            <Text>Loại xe: {data?.type_of_vehicle}</Text>
            <Text>
              Trạng thái:{" "}
              {STATUS_ASSET_OBJ[data?.status as keyof typeof STATUS_ASSET_OBJ]}
            </Text>
            <Text>Hãng sản xuất: {data?.car_manufacturer}</Text>
            <Text>Nước sản xuất: {data?.manufacture_country}</Text>
            <Text>Số lượng: {data?.quantity}</Text>
          </Grid.Col>

          {data?.User ? (
            <Grid.Col>
              <Button onClick={handleRevoke}>Thu hồi tài sản</Button>
            </Grid.Col>
          ) : null}
        </Grid>
      )}
    </div>
  );
};
