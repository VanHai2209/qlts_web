"use client";

import { Stack, Title } from "@mantine/core";
import React, { useMemo } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { ICategory } from "@/libs/types/category";

const colors = ["#5470C6", "#91CC75", "#EE6666"];

export const CategoryReport = () => {
  const { isLoading, data } = useQuery<ICategory[]>({
    queryKey: ["category-chart"],
    queryFn: async () => {
      const res = await request.get(`/category-management/categories`);

      return res.data;
    },
  });

  const option: EChartsOption = useMemo(() => {
    return {
      color: colors,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },

      xAxis: {
        type: "category",
        data: data?.length ? data.map((item) => item.name) : [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "bar",
          data: data?.length ? data.map((item) => item.Asset.length) : [],
        },
      ],
    };
  }, [data]);

  return (
    <Stack align="center">
      <ReactECharts
        option={option}
        style={{
          height: 500,
          width: "100%",
        }}
        showLoading={isLoading}
      />

      <Title order={5}>Biểu đồ thống kê số lượng tài sản theo danh mục</Title>
    </Stack>
  );
};
