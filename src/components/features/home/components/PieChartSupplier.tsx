"use client";

import { Stack } from "@mantine/core";
import React, { useMemo } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { ISupplier } from "@/libs/types/category";

export const PieChartSupplier = () => {
  const { isLoading, data } = useQuery<ISupplier[]>({
    queryKey: ["supplier-chart"],
    queryFn: async () => {
      const res = await request.get(`/category-management/suppliers`);

      return res.data.data;
    },
  });

  const option: EChartsOption = useMemo(() => {
    return {
      title: {
        text: "Biểu đồ cung cấp tài sản của các nhà cung cấp",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Số lượng tài sản cung cấp",
          type: "pie",
          radius: "50%",
          data: data?.map((item) => ({
            name: item.name,
            value: item.Asset.length,
          })),

          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }, [data]);

  return (
    <Stack>
      <ReactECharts
        option={option}
        style={{
          height: 500,
          width: "100%",
        }}
        showLoading={isLoading}
      />
    </Stack>
  );
};
