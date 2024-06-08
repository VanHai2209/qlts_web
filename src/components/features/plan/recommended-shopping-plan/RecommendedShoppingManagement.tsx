"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { IDepartment } from "@/libs/types/category";
import { ReactTable } from "@/components/shared/table/ReactTable";
import { RecommendedShoppingFilter } from "./components/RecommendedShoppingFilter";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";
import { IRecommendPlans } from "@/libs/types/plan";
import { format } from "date-fns";
import { COLOR_STATUS, STATUS } from "@/libs/utils/constants";
import { Text } from "@mantine/core";

const RecommendedShoppingManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IRecommendPlans>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>KHMSKN-{row.original.id}</span>,
      },
      {
        accessorKey: "Department.name",
        header: "Phòng ban",
      },
      {
        accessorKey: "User",
        header: "Người quản lý",
        Cell({ row }) {
          const manager = row.original.Department.User.find(
            (user) => user.role === "MANAGER"
          );

          return manager ? `QL-${manager.id} ${manager.name}` : "-";
        },
      },
      {
        accessorKey: "implemention_date",
        header: "Ngày thực hiện",
        Cell: ({ row }) => {
          return (
            <span>
              {format(new Date(row.original.implemention_date), "dd/MM/yyyy")}
            </span>
          );
        },
      },
      {
        accessorKey: "petition_date",
        header: "Ngày kiến nghị",
        Cell: ({ row }) => {
          return (
            <span>
              {format(new Date(row.original.petition_date), "dd/MM/yyyy")}
            </span>
          );
        },
      },
      {
        accessorKey: "description_plan",
        header: "Mô tả kế hoạch",
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        Cell: ({ row }) => {
          return (
            <Text
              color={
                COLOR_STATUS[row.original.status as keyof typeof COLOR_STATUS]
              }
            >
              {STATUS[row.original.status as keyof typeof STATUS]}
            </Text>
          );
        },
      },
    ],
    []
  );

  const columnsExcel = useMemo<Column<IRecommendPlans>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => `KHMSKN-${item.id}`,
      },
      {
        accessorKey: "Department.name" as any,
        header: "Phòng ban",
        getData(item) {
          return item.Department.name;
        },
      },
      {
        accessorKey: "User.manager" as any,
        header: "Quản lý",
        getData: (item) => {
          const manager = item.Department.User?.find(
            (user) => user.role === "MANAGER"
          );
          return manager
            ? `ID: QL-${manager?.id} - ${manager?.name}`
            : "Không có quản lý";
        },
      },
      {
        accessorKey: "implemention_date",
        header: "Ngày thực hiện",
        getData: (item) => {
          return format(new Date(item.implemention_date), "dd/MM/yyyy");
        },
      },
      {
        accessorKey: "petition_date",
        header: "Ngày thực hiện",
        getData: (item) => {
          return format(new Date(item.petition_date), "dd/MM/yyyy");
        },
      },
      {
        accessorKey: "RecommendPlanAsset.asset_name" as any,
        header: "Thông tin tài sản",
        getData: (item) => {
          console.log("item", item);

          return `Tên: ${item?.RecommendPlanAsset?.asset_name} - Nhà cung cấp: ${item?.RecommendPlanAsset?.Supplier?.name}`;
        },
      },
      {
        accessorKey: "description_plan",
        header: "Mô tả kế hoạch",
      },
      {
        accessorKey: "evaluation",
        header: "Đánh giá kế hoạch",
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        getData(item) {
          return STATUS[item.status as keyof typeof STATUS];
        },
      },
    ],
    []
  );

  const handleExportExcel = (data: IRecommendPlans[]) => {
    onGetExport({
      title: "DS mua sam duoc kien nghi",
      worksheetname: "DS mua sam duoc kien nghi",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <RecommendedShoppingFilter />

      <ReactTable
        endpointAPI={"/plan/recommended-shopping"}
        name={"recommended-shopping-plan"}
        columns={columns}
        seeDetail={true}
        handleExportExcel={handleExportExcel}
      />
    </TableContextProvider>
  );
};

export { RecommendedShoppingManagement };
