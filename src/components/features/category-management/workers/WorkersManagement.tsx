"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { IWorker } from "@/libs/types/category";
import { ReactTable } from "@/components/shared/table/ReactTable";
import { WorkerFilter } from "./components/WorkerFilter";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";
import { Text } from "@mantine/core";

const WorkersManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IWorker>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>CN-{row.original.id}</span>,
      },
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "address",
        header: "Địa chỉ",
      },
      {
        accessorKey: "phone_number",
        header: "Số điện thoại",
      },
      {
        accessorKey: "Asset",
        header: "Tài sản",
        Cell: ({ row }) => {
          const asset = row.original.Asset?.map(
            (asset) => `TS-${asset.id} - ${asset.name}`
          ).join("\n");

          return asset ? (
            <Text style={{ whiteSpace: "pre-line" }}>{asset}</Text>
          ) : (
            "Không có tài sản"
          );
        },
      },
      {
        accessorKey: "Department.name",
        header: "Phòng ban làm việc",
      },
    ],
    []
  );

  const columnsExcel = useMemo<Column<IWorker>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => `CN-${item.id}`,
      },
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "address",
        header: "Địa chỉ",
      },
      {
        accessorKey: "phone_number",
        header: "Số điện thoại",
      },
      {
        accessorKey: "Department.name" as keyof IWorker,
        header: "Phòng ban làm việc",
      },
      {
        accessorKey: "Department.name" as keyof IWorker,
        header: "Phòng ban làm việc",
      },
      {
        accessorKey: "User.Asset" as any,
        header: "Tài sản",
        getData: (item) => {
          const asset = item.Asset?.map(
            (asset) => `ID: TS-${asset.id} - ${asset.name}`
          ).join("\n");
          return asset ? asset : "Không có tài sản";
        },
      },
    ],
    []
  );

  const handleExportExcel = (data: IWorker[]) => {
    onGetExport({
      title: "Danh sách nhân viên",
      worksheetname: "Danh sách nhân viên",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <WorkerFilter />

      <ReactTable
        endpointAPI={"/category-management/workers"}
        name={"workers"}
        columns={columns}
        handleExportExcel={handleExportExcel}
      />
    </TableContextProvider>
  );
};

export { WorkersManagement };
