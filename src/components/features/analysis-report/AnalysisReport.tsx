"use client";

import { Stack, Title } from "@mantine/core";
import React, { useMemo } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { ISupplier } from "@/libs/types/category";
import { differenceInHours } from "date-fns";

const colors = ["#5470C6", "#91CC75", "#EE6666"];

export const AnalysisReport = () => {
  const { isLoading, data } = useQuery<ISupplier[]>({
    queryKey: ["supplier-chart"],
    queryFn: async () => {
      const res = await request.get(`/category-management/suppliers`);

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
        data: [
          "Số lượng tài sản cung cấp",
          "Tổng giá thành",
          "Thời gian sử dụng (ngày)",
        ],
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          // prettier-ignore
          data: data?.length ? data.map((item) => item.name) : [],
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Số lượng tài sản cung cấp",
          position: "right",
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0],
            },
          },
          axisLabel: {
            formatter: "{value}",
          },
        },
        {
          type: "value",
          name: "Tổng giá thành",
          position: "right",
          alignTicks: true,
          offset: 120,
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
        {
          type: "value",
          name: "Thời gian sử dụng (ngày)",
          position: "left",
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[2],
            },
          },
          axisLabel: {
            formatter: "{value}",
          },
        },
      ],
      series: [
        {
          name: "Số lượng tài sản cung cấp",
          type: "line",
          data: data?.length ? data.map((item) => item.Asset.length) : [],
        },
        {
          name: "Tổng giá thành",
          type: "line",
          yAxisIndex: 1,
          data: data?.length
            ? data.map((item) =>
                item.Asset.reduce((acc, item) => {
                  return acc + Number(item.entry_price);
                }, 0)
              )
            : [],
        },
        {
          name: "Thời gian sử dụng (ngày)",
          type: "bar",
          yAxisIndex: 2,
          data: data?.length
            ? data.map((item) =>
                (
                  item.Asset.reduce((acc, item) => {
                    return (
                      acc +
                      differenceInHours(new Date(), new Date(item.entry_time))
                    );
                  }, 0) / 24
                )?.toFixed(2)
              )
            : [],
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

      <Title order={5}>
        Biểu đồ thống kê số lượng tài sản theo nhà cung cấp
      </Title>
    </Stack>
  );
};
