"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { ISupplier } from "@/libs/types/category";
import { ReactTable } from "@/components/shared/table/ReactTable";
import { SupplierFilter } from "./components/SupplierFilter";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";

const SuppliersManagement = () => {
  const columns = useMemo<MRT_ColumnDef<ISupplier>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>NCC-{row.original.id}</span>,
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
    ],
    []
  );

  const columnsExcel = useMemo<Column<ISupplier>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => `NCC-${item.id}`,
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
        accessorKey: "Assets" as any,
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

  const handleExportExcel = (data: ISupplier[]) => {
    onGetExport({
      title: "Danh sách nhà cung cấp",
      worksheetname: "Danh sách nhà cung cấp",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <SupplierFilter />

      <ReactTable
        endpointAPI={"/category-management/suppliers"}
        name={"suppliers"}
        columns={columns}
        handleExportExcel={handleExportExcel}
      />
    </TableContextProvider>
  );
};

export { SuppliersManagement };
