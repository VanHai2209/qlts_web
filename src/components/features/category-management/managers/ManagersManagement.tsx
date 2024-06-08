"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { IManager } from "@/libs/types/category";
import { ReactTable } from "@/components/shared/table/ReactTable";
import { ManagerFilter } from "./components/ManagerFilter";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";
import { Text } from "@mantine/core";

const ManagersManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IManager>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>QL-{row.original.id}</span>,
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
      {
        accessorKey: "username",
        header: "Tài khoản",
      },
      {
        accessorKey: "password",
        header: "Mật khẩu",
        Cell: () => <>******</>,
      },
    ],
    []
  );

  const columnsExcel = useMemo<Column<IManager>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => `QL-${item.id}`,
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
        accessorKey: "phone_number",
        header: "Số điện thoại",
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
        accessorKey: "Department.name" as keyof IManager,
        header: "Phòng ban làm việc",
      },
      {
        accessorKey: "username",
        header: "Tài khoản",
      },
      {
        accessorKey: "password",
        header: "Mật khẩu",
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

  const handleExportExcel = (data: IManager[]) => {
    onGetExport({
      title: "Danh sách người quản lý",
      worksheetname: "Danh sách người quản lý",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <>
        <ManagerFilter />

        <ReactTable
          endpointAPI={"/category-management/managers"}
          name={"managers"}
          columns={columns}
          handleExportExcel={handleExportExcel}
        />
      </>
    </TableContextProvider>
  );
};

export { ManagersManagement };
