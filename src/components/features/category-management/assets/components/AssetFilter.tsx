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
import { AssetFilterType } from "./types";
import { useTableContext } from "@/components/shared/table/components/TableContext";
import { STATUS_ASSET } from "@/libs/utils/constants";

export const AssetFilter = () => {
  const { control, reset, getValues, resetField } = useForm<AssetFilterType>({
    defaultValues: {
      id: "",
      name: "",
      status: "",
      condition: "",
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
      name: undefined,
      status: undefined,
      condition: undefined,
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
            name="name"
            render={({ field }) => (
              <TextInput label="Tên" {...field} placeholder="Name" />
            )}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label={"Trạng thái"}
                placeholder={"Nhập trạng thái"}
                value={value || null}
                onChange={(value) => onChange(value || "")}
                data={Object.entries(STATUS_ASSET)?.map((item) => ({
                  value: item[0] + "",
                  label: item[1] + "",
                }))}
                clearable
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Controller
            name="condition"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={"Tình trạng"}
                placeholder={"Nhập Tình trạng"}
                value={value}
                onChange={(value) => onChange(value || "")}
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
