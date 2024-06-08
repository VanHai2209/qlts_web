"use client";

import { Stack } from "@mantine/core";
import React, { useMemo } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { IDepartment } from "@/libs/types/category";
import { format } from "date-fns";

interface IBuildingRentalCount {
  countOfUsed: number;
  countOfReadyToUse: IDepartment[];
  countOfMaintenance: number;
  countOfRenting: IDepartment[];
}

export const BuildingRentalBar = () => {
  const { isLoading, data } = useQuery<IBuildingRentalCount>({
    queryKey: ["building-rental-count"],
    queryFn: async () => {
      const res = await request.get(`/asset-management/building-rental/count`);

      return res.data;
    },
  });

  const option: EChartsOption = useMemo(() => {
    return {
      title: {
        text: "Biểu đồ phân tích khai thác cho thuê nhà",
        left: "center",
      },
      xAxis: {
        type: "category",
        data: ["Chưa sử dụng", "Đã thuê"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Số lượng tài sản cung cấp",
          type: "bar",
          data: [data?.countOfReadyToUse.length, data?.countOfRenting?.length],
        },
      ],
      tooltip: {
        trigger: "axis",
        formatter: function (params: any) {
          let result = "";
          switch (params[0].axisValue) {
            case "Chưa sử dụng":
              params[0].seriesName = "Chưa sử dụng";

              result +=
                params[0].seriesName +
                ": " +
                data?.countOfReadyToUse.length +
                "<br/>";

              data?.countOfReadyToUse.forEach((item) => {
                result += `Tên: ${item.name}<br/>Địa chỉ: ${item.address}`;
                result += "<br/>----------------<br/>";
              });

              break;
            case "Đã thuê":
              params[0].seriesName = "Đã thuê";

              result +=
                params[0].seriesName +
                ": " +
                data?.countOfRenting.length +
                "<br/>";

              data?.countOfRenting.forEach((item) => {
                result += `Tên: ${item.name}<br/>Địa chỉ: ${
                  item.address
                }<br/>Giá thuê: ${
                  item.BuidingRental?.[0].rental_price
                } VNĐ<br/>Thời gian cho thuê: ${format(
                  new Date(item.BuidingRental?.[0].rental_date_start),
                  "dd/MM/yyyy"
                )} - ${format(
                  new Date(item.BuidingRental?.[0].rental_date_end),
                  "dd/MM/yyyy"
                )}<br/>Thông tin người thuê: ${
                  item.BuidingRental?.[0].renter_information
                }`;
                result += "<br/>----------------<br/>";
              });

              break;
          }

          return result;
        },
      },
    };
  }, [data]);

  return (
    <Stack
      style={{
        width: "100%",
        maxWidth: 800,
      }}
    >
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
