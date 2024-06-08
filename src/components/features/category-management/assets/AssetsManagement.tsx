"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { IAsset } from "@/libs/types/category";
import { ReactTable } from "@/components/shared/table/ReactTable";
import { AssetFilter } from "./components/AssetFilter";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { CONDITION_ASSET, STATUS_ASSET } from "@/libs/utils/constants";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";
import { format } from "date-fns";

const AssetsManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IAsset>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>TS-{row.original.id}</span>,
      },
      {
        accessorKey: "name",
        header: "Tên",
      },
      {
        accessorKey: "asset_code",
        header: "Mã tài sản",
      },
      {
        accessorKey: "condition",
        header: "Tình trạng",
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        Cell: ({ row }) => {
          return (
            <span>
              {
                Object.entries(STATUS_ASSET).find(
                  ([key]) => key === row.original.status
                )?.[1]
              }
            </span>
          );
        },
      },
    ],
    []
  );

  const columnsExcel = useMemo<Column<IAsset>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => {
          return `TS-${item.id}`;
        },
      },
      {
        accessorKey: "name",
        header: "Tên tài sản",
      },
      {
        accessorKey: "asset_code",
        header: "Mã tài sản",
      },
      {
        accessorKey: "entry_time",
        header: "Thời gian nhập",
        getData: (item) => {
          return format(new Date(item.entry_time), "dd/MM/yyyy");
        },
      },
      {
        accessorKey: "entry_price",
        header: "Giá nhập",
      },
      {
        accessorKey: "depreciation_rate",
        header: "Khấu hao",
      },
      {
        accessorKey: "Department.name" as any,
        header: "Phòng ban",
      },
      {
        accessorKey: "User" as any,
        header: "Người sử dụng",
        getData(item) {
          if (!item.User?.id) {
            return "";
          }

          return `${item.User.role == "MANAGER" ? "QL" : "CN"}${item.User.id}-${
            item.User.name
          } `;
        },
      },
      {
        accessorKey: "Supplier.name" as any,
        header: "Nhà cung cấp",
      },
      {
        accessorKey: "condition",
        header: "Tình trạng",
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        getData: (item) => {
          const condition = Object.entries(STATUS_ASSET).find(
            ([key]) => key === item.status
          )?.[1];

          return condition ? condition : "Không có trạng thái";
        },
      },
    ],
    []
  );

  const handleExportExcel = (data: IAsset[]) => {
    onGetExport({
      title: "Danh sách tài sản",
      worksheetname: "Danh sách tài sản",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <AssetFilter />

      <ReactTable
        endpointAPI={"/category-management/assets"}
        name={"assets"}
        columns={columns}
        seeDetail={true}
        handleExportExcel={handleExportExcel}
      />
    </TableContextProvider>
  );
};

export { AssetsManagement };
