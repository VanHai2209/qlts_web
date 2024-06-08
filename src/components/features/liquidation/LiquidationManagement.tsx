"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { ReactTable } from "@/components/shared/table/ReactTable";
import { MaintenanceFilter } from "./components/LiquidationFilter";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";
import { ILiquidationAsset, IPlans } from "@/libs/types/plan";
import { format } from "date-fns";
import { STATUS_ASSET_OBJ } from "@/libs/utils/constants";
import { NumberFormatter } from "@mantine/core";
import { LiquidationChart } from "./components/LiquidationChart";

const LiquidationManagement = () => {
  const columns = useMemo<MRT_ColumnDef<ILiquidationAsset>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>TLTS-{row.original.id}</span>,
      },
      {
        accessorKey: "User",
        header: "Người lên kế hoạch",
        Cell({ row }) {
          return row?.original?.User?.name
            ? `${row?.original?.User?.name}`
            : "-";
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
        header: "Ngày lên kế hoạch",
        Cell: ({ row }) => {
          return (
            <span>
              {format(new Date(row.original.petition_date), "dd/MM/yyyy")}
            </span>
          );
        },
      },
      {
        accessorKey: "PlanAsset",
        header: "Thông tin tài sản",
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.Asset?.name} - {row.original.Asset?.Supplier?.name}{" "}
              -{" "}
              {
                STATUS_ASSET_OBJ[
                  row.original.Asset?.status as keyof typeof STATUS_ASSET_OBJ
                ]
              }
            </span>
          );
        },
      },
      {
        accessorKey: "description_plan",
        header: "Mô tả kế hoạch",
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
      },
      {
        accessorKey: "Asset.entry_price",
        header: "Giá gốc tài sản",
        Cell: ({ row }) => {
          return (
            <NumberFormatter
              suffix="VNĐ"
              value={row.original.Asset.entry_price}
              thousandSeparator
            />
          );
        },
      },
      {
        accessorKey: "liquidation_price",
        header: "Giá thanh lý",
        Cell: ({ row }) => {
          return (
            <NumberFormatter
              suffix="VNĐ"
              value={row.original.liquidation_price}
              thousandSeparator
            />
          );
        },
      },
      {
        accessorKey: "asset_purchasing_unit",
        header: "Đơn vị mua tài sản",
      },
    ],
    []
  );

  const columnsExcel = useMemo<Column<ILiquidationAsset>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => `TLTS-${item.id}`,
      },
      {
        accessorKey: "User.name" as any,
        header: "Người lên kế hoạch",
        getData(item) {
          return item?.User?.name ? `${item?.User?.name}` : "-";
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
        accessorKey: "description_plan",
        header: "Mô tả kế hoạch",
      },
      {
        accessorKey: "Asset.name" as any,
        header: "Thông tin tài sản",
        getData: (item) => {
          return `${item.Asset?.name} - ${item.Asset?.Supplier?.name} - ${
            STATUS_ASSET_OBJ[
              item.Asset?.status as keyof typeof STATUS_ASSET_OBJ
            ]
          }`;
        },
      },
      {
        accessorKey: "description_plan",
        header: "Mô tả kế hoạch",
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
      },
      {
        accessorKey: "Asset.entry_price" as any,
        header: "Giá gốc tài sản",
      },
      {
        accessorKey: "liquidation_price",
        header: "Giá thanh lý",
      },
      {
        accessorKey: "asset_purchasing_unit",
        header: "Đơn vị mua tài sản",
      },
    ],
    []
  );

  const handleExportExcel = (data: ILiquidationAsset[]) => {
    onGetExport({
      title: "DS thanh ly tai san",
      worksheetname: "DS thanh ly tai san",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <LiquidationChart />

      <MaintenanceFilter />
      <ReactTable
        endpointAPI={"/asset-management/liquidation"}
        name={"liquidation"}
        columns={columns}
        handleExportExcel={handleExportExcel}
      />
    </TableContextProvider>
  );
};

export { LiquidationManagement };
