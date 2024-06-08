"use client";

import {
  Button,
  Flex,
  Grid,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTableContext } from "@/components/shared/table/components/TableContext";
import { DateInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import { IDepartment } from "@/libs/types/category";
import { request } from "@/libs/request";
import { RecommendedShoppingFilterType } from "../../recommended-shopping-plan/components/types";

export const RecommendedShoppingMaintenanceFilter = () => {
  const { data: departments } = useQuery<IDepartment[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await request.get("/category-management/departments");
      return res.data.data;
    },
  });

  const { control, reset, getValues } = useForm<RecommendedShoppingFilterType>({
    defaultValues: {
      id: "",
      implemention_date: undefined,
      petition_date: undefined,
      department_id: "",
    },
  });

  const tableCtx = useTableContext();

  const handleSearch = () => {
    const values = getValues();

    console.log(values);

    tableCtx?.handleChangeParams({
      ...values,
    });
  };

  const handleReset = () => {
    reset({
      id: undefined,
      implemention_date: undefined,
      petition_date: undefined,
      department_id: undefined,
    });
    tableCtx?.handleChangeParams({});
  };

  return (
    <Stack
      style={{
        border: "1px solid #e1e1e1",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        Tìm kiếm
      </Text>

      <Grid>
        <Grid.Col span={6}>
          <Controller
            control={control}
            name="id"
            render={({ field }) => (
              <TextInput type="number" label="ID" {...field} placeholder="ID" />
            )}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Controller
            control={control}
            name="implemention_date"
            render={({ field: { onChange, value } }) => (
              <DateInput
                label="Ngày thực hiện"
                value={value}
                onChange={onChange}
                placeholder="Ngày thực hiện"
                clearable
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Controller
            control={control}
            name="petition_date"
            render={({ field: { onChange, value } }) => (
              <DateInput
                label="Ngày kiến nghị"
                value={value}
                onChange={onChange}
                placeholder="Ngày kiến nghị"
                clearable
              />
            )}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Controller
            name="department_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label={"Phòng ban"}
                value={value}
                onChange={(value) => onChange(value || "")}
                placeholder="Chọn phòng ban"
                data={departments?.map((item) => ({
                  value: item.id + "",
                  label: item.name,
                }))}
                clearable
              />
            )}
          />
        </Grid.Col>
      </Grid>

      <Flex gap={12} justify={"flex-end"}>
        <Button variant="outline" onClick={handleReset}>
          Huỷ bỏ
        </Button>
        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </Flex>
    </Stack>
  );
};
