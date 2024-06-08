"use client";

import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

import { ReactTable } from "@/components/shared/table/ReactTable";
import { TableContextProvider } from "@/components/shared/table/components/TableContext";
import { Column, onGetExport } from "@/libs/services/xlsx/exportCSV";
import { IBuildingRental } from "@/libs/types/plan";
import { BuildingRentalFilter } from "./components/BuildingRentalFilter";
import { BuildingRentalBar } from "./components/BuildingRentalBar";

export const BuildingRentalManagement = () => {
  const columns = useMemo<MRT_ColumnDef<IBuildingRental>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <span>T-{row.original.id}</span>,
      },
      {
        accessorKey: "Department.name",
        header: "Tên",
      },
      {
        accessorKey: "Department.address",
        header: "Vị trí phòng",
      },
      {
        accessorKey: "size_room",
        header: "Kích thước phòng",
      },
      {
        accessorKey: "renter_information",
        header: "Thông tin người thuê",
      },
      {
        accessorKey: "rental_date_start",
        header: "Ngày thuê bắt đầu",
        Cell: ({ row }) => (
          <span>
            {new Date(row.original.rental_date_start).toLocaleDateString()}
          </span>
        ),
      },
      {
        accessorKey: "rental_date_end",
        header: "Ngày thuê kết thúc",
        Cell: ({ row }) => (
          <span>
            {new Date(row.original.rental_date_end).toLocaleDateString()}
          </span>
        ),
      },
    ],
    []
  );

  const columnsExcel = useMemo<Column<IBuildingRental>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        getData: (item) => `TSDT-${item.id}`,
      },
      {
        accessorKey: "name",
        header: "Tên",
        getData(item) {
          return item.Department.name;
        },
      },
      {
        accessorKey: "location_room",
        header: "Vị trí phòng",
        getData(item) {
          return item.Department.address;
        },
      },
      {
        accessorKey: "size_room",
        header: "Kích thước phòng",
      },
      {
        accessorKey: "renter_information",
        header: "Thông tin người thuê",
      },
      {
        accessorKey: "rental_date_start",
        header: "Ngày thuê bắt đầu",
        getData(item) {
          return new Date(item.rental_date_start).toLocaleDateString();
        },
      },
      {
        accessorKey: "rental_date_end",
        header: "Ngày thuê kết thúc",
        getData(item) {
          return new Date(item.rental_date_end).toLocaleDateString();
        },
      },
    ],
    []
  );

  const handleExportExcel = (data: IBuildingRental[]) => {
    onGetExport({
      title: "DS cho thue toa nha",
      worksheetname: "DS cho thue toa nha",
      columns: columnsExcel,
      data,
    });
  };

  return (
    <TableContextProvider>
      <BuildingRentalBar />

      <BuildingRentalFilter />
      <ReactTable
        endpointAPI={"/asset-management/building-rental"}
        name={"building-rental"}
        columns={columns}
        handleExportExcel={handleExportExcel}
      />
    </TableContextProvider>
  );
};
