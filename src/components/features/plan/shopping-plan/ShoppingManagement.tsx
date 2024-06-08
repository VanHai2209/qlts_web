"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { ReactTable } from "@/components/shared/table/ReactTable";
import { ShoppingFilter } from "./components/ShoppingFilter";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";
import { IPlans } from "@/libs/types/plan";
import { format } from "date-fns";

const ShoppingManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IPlans>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>KHMS-{row.original.id}</span>,
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
        accessorKey: "PlanAsset",
        header: "Thông tin tài sản",
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.PlanAsset?.asset_name} -{" "}
              {row.original.PlanAsset?.Supplier?.name}
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
    ],
    []
  );

  const columnsExcel = useMemo<Column<IPlans>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => `KHMS-${item.id}`,
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
        accessorKey: "PlanAsset.asset_name" as any,
        header: "Thông tin tài sản",
        getData: (item) => {
          return `${item.PlanAsset?.asset_name} - ${item.PlanAsset?.Supplier?.name}`;
        },
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
      },
    ],
    []
  );

  const handleExportExcel = (data: IPlans[]) => {
    onGetExport({
      title: "DS mua sam",
      worksheetname: "DS mua sam",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <ShoppingFilter />

      <ReactTable
        endpointAPI={"/plan/shopping"}
        name={"shopping-plan"}
        columns={columns}
        seeDetail={true}
        handleExportExcel={handleExportExcel}
      />
    </TableContextProvider>
  );
};

export { ShoppingManagement };
