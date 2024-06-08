"use client";

import { Stack } from "@mantine/core";
import React, { useMemo } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { ISupplier } from "@/libs/types/category";
import { differenceInHours } from "date-fns";
import { ILiquidationAsset } from "@/libs/types/plan";

const colors = ["#5470C6", "#91CC75"];

export const LiquidationChart = () => {
  const { isLoading, data } = useQuery<ILiquidationAsset[]>({
    queryKey: ["liquidation"],
    queryFn: async () => {
      const res = await request.get(`/asset-management/liquidation`);

      return res.data.data;
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
      grid: {
        right: "20%",
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      legend: {
        data: ["Giá gốc tài sản", "Giá thanh lý tài sản"],
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          // prettier-ignore
          data: data?.length ? data.map((item) => item.Asset.name) : [],
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Giá gốc tài sản",
          position: "right",
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0],
            },
          },
          axisLabel: {
            formatter: "{value} VNĐ",
          },
        },
        {
          type: "value",
          name: "Giá thanh lý tài sản",
          position: "left",
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[1],
            },
          },
          axisLabel: {
            formatter: "{value} VNĐ",
          },
        },
      ],
      series: [
        {
          name: "Giá gốc tài sản",
          type: "bar",
          yAxisIndex: 0,
          data: data?.length ? data.map((item) => item.original_price) : [],
        },
        {
          name: "Giá thanh lý tài sản",
          type: "bar",
          yAxisIndex: 1,
          data: data?.length
            ? data.map((item) => item.liquidation_price?.toFixed(2))
            : [],
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
