"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { ReactTable } from "@/components/shared/table/ReactTable";
import { SpecialFilter } from "./components/SpecialFilter";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";
import { ISpecialAsset } from "@/libs/types/plan";
import { STATUS_ASSET } from "@/libs/utils/constants";

const SpecialManagement = () => {
  const columns = useMemo<MRT_ColumnDef<ISpecialAsset>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>TSDT-{row.original.id}</span>,
      },
      {
        accessorKey: "name",
        header: "Tên xe",
      },
      {
        accessorKey: "User",
        header: "Người quản lý xe",
        Cell({ row }) {
          return row?.original?.User?.name
            ? `${row?.original?.User?.name}`
            : "-";
        },
      },
      {
        accessorKey: "type_of_vehicle",
        header: "Loại xe",
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
      {
        accessorKey: "car_manufacturer",
        header: "Hãng sản xuất",
      },
      {
        accessorKey: "manufacture_country",
        header: "Nước sản xuất",
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
      },
      {
        accessorKey: "purpose_use",
        header: "Mục đích sử dụng",
      },
    ],
    []
  );

  const columnsExcel = useMemo<Column<ISpecialAsset>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => `TSDT-${item.id}`,
      },
      {
        accessorKey: "name",
        header: "Tên xe",
      },
      {
        accessorKey: "User.name" as any,
        header: "Người quản lý",
        getData(item) {
          return item?.User?.name ? `${item?.User?.name}` : "-";
        },
      },
      {
        accessorKey: "type_of_vehicle",
        header: "Loại xe",
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        getData(item) {
          return Object.entries(STATUS_ASSET).find(
            ([key]) => key === item.status
          )?.[1];
        },
      },
      {
        accessorKey: "car_manufacturer",
        header: "Hãng sản xuất",
      },
      {
        accessorKey: "manufacture_country",
        header: "Nước sản xuất",
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
      },
      {
        accessorKey: "purpose_use",
        header: "Mục đích sử dụng",
      },
    ],
    []
  );

  const handleExportExcel = (data: ISpecialAsset[]) => {
    onGetExport({
      title: "DS tai san dac thu",
      worksheetname: "DS tai san dac thu",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <SpecialFilter />

      <ReactTable
        endpointAPI={"/asset-management/special"}
        name={"special"}
        columns={columns}
        handleExportExcel={handleExportExcel}
        seeDetail={true}
      />
    </TableContextProvider>
  );
};

export { SpecialManagement };
