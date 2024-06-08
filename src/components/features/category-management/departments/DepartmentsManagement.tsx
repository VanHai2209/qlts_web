"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { IDepartment } from "@/libs/types/category";
import { ReactTable } from "@/components/shared/table/ReactTable";
import { DepartmentFilter } from "./components/DepartmentFilter";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";
import { STATUS_DEPARTMENT } from "@/libs/utils/constants";

const DepartmentsManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IDepartment>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>PB-{row.original.id}</span>,
      },
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorKey: "address",
        header: "Địa chỉ",
      },
      {
        accessorKey: "status",
        header: "Địa chỉ",
        Cell: ({ row }) => (
          <span>
            {
              Object.entries(STATUS_DEPARTMENT).find(
                ([key]) => key === row.original.status
              )?.[1]
            }
          </span>
        ),
      },
    ],
    []
  );

  const columnsExcel = useMemo<Column<IDepartment>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => `PB-${item.id}`,
      },
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorKey: "address",
        header: "Địa chỉ",
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        getData(item) {
          return Object.entries(STATUS_DEPARTMENT).find(
            ([key]) => key === item.status
          )?.[1];
        },
      },
      {
        accessorKey: "User.manager" as any,
        header: "Quản lý",
        getData: (item) => {
          const manager = item.User?.find((user) => user.role === "MANAGER");
          return manager
            ? `ID: QL-${manager?.id} - ${manager?.name}`
            : "Không có quản lý";
        },
      },
      {
        accessorKey: "User.worker" as any,
        header: "Nhân viên",
        getData: (item) => {
          const workers = item.User?.filter((user) => user.role === "WORKER");
          return workers.length > 0
            ? workers
                .map((worker) => `ID: CN-${worker.id} - ${worker.name}`)
                .join("\n")
            : "Không có nhân viên";
        },
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

  const handleExportExcel = (data: IDepartment[]) => {
    onGetExport({
      title: "Danh sách phòng ban",
      worksheetname: "Danh sách phòng ban",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <DepartmentFilter />

      <ReactTable
        endpointAPI={"/category-management/departments"}
        name={"departments"}
        columns={columns}
        seeDetail={true}
        handleExportExcel={handleExportExcel}
      />
    </TableContextProvider>
  );
};

export { DepartmentsManagement };
