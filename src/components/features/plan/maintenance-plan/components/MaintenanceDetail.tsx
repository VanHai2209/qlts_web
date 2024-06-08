"use client";

import { request } from "@/libs/request";
import { Grid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import { IPlans } from "@/libs/types/plan";

export const MaintenanceDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<IPlans>({
    queryKey: ["maintenance-plan", id],
    queryFn: async () => {
      const res = await request.get(`/plan/maintenance/${id}`);
      return res.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid>
          <Grid.Col
            span={6}
            style={{
              border: "1px solid #eaeaea",
            }}
          >
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

          <Grid.Col
            span={6}
            style={{
              border: "1px solid #eaeaea",
            }}
          >
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin bảo trì
            </Text>

            <Text>Tên tài sản: {data?.PlanAsset?.asset_name}</Text>
            <Text>Nhà cung cấp: {data?.PlanAsset?.Supplier?.name}</Text>
            {data?.implemention_date && (
              <Text>
                Ngày thực hiện:{" "}
                {format(new Date(data.implemention_date), "dd/MM/yyyy")}
              </Text>
            )}
            {data?.petition_date && (
              <Text>
                Ngày kiến nghị:{" "}
                {format(new Date(data.petition_date), "dd/MM/yyyy")}
              </Text>
            )}

            <Text>Mô tả kế hoạch: {data?.description_plan}</Text>
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
};
