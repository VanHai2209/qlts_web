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
import { MaintenanceFilterType } from "./types";
import { useTableContext } from "@/components/shared/table/components/TableContext";
import { DateInput } from "@mantine/dates";

export const MaintenanceFilter = () => {
  const { control, reset, getValues } = useForm<MaintenanceFilterType>({
    defaultValues: {
      id: "",
      implemention_date: undefined,
      petition_date: undefined,
    },
  });

  const tableCtx = useTableContext();

  const handleSearch = () => {
    const values = getValues();

    tableCtx?.handleChangeParams({
      ...values,
    });
  };

  const handleReset = () => {
    reset({
      id: undefined,
      implemention_date: undefined,
      petition_date: undefined,
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
