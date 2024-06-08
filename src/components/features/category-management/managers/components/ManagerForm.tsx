"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ManagerInputSchema, ManagerInputType } from "./types";
import { IDepartment, IManager } from "@/libs/types/category";
import { useCreateOrUpdate } from "@/libs/hooks/useCreateOrUpdate";
import { useGetDepartment } from "../../departments/hooks/useGetDepartment";

interface Props {
  data?: IManager;
  departments: IDepartment[];
}

export const ManagerForm = ({ data, departments }: Props) => {
  const isEdit = !!data;

  const { data: departmentsData } = useGetDepartment({
    initialData: departments,
  });

  const { mutateAsync } = useCreateOrUpdate({
    endpointAPI: "/category-management/managers",
    queryKey: "managers",
    id: data?.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ManagerInputType>({
    resolver: zodResolver(ManagerInputSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone_number: "",
      department_id: "",
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("address", data.address);
      setValue("phone_number", data.phone_number);
      setValue("department_id", data.department_id + "");
      setValue("username", data.username);
      setValue("password", data.password);
    }
  }, [data, setValue]);

  const onSubmit = async (data: ManagerInputType) => {
    mutateAsync({ ...data, department_id: parseInt(data.department_id) });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{
        marginTop: 3,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={"Tên"}
            placeholder={"Nhập tên"}
            value={value}
            onChange={onChange}
            error={errors.name?.message as string}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={"Email"}
            placeholder={"Nhập email"}
            value={value}
            onChange={onChange}
            error={errors.email?.message as string}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={"Địa chỉ"}
            placeholder={"Nhập địa chỉ"}
            value={value}
            onChange={onChange}
            error={errors.address?.message as string}
          />
        )}
      />

      <Controller
        name="phone_number"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={"Số điện thoại"}
            placeholder={"Nhập số điện thoại"}
            value={value}
            onChange={onChange}
            error={errors.phone_number?.message as string}
          />
        )}
      />

      <Controller
        name="department_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label={"Phòng ban làm việc"}
            value={value}
            onChange={onChange}
            placeholder="Chọn phòng ban"
            data={departmentsData.map((item) => ({
              value: item.id + "",
              label: item.name,
            }))}
            error={errors.department_id?.message as string}
          />
        )}
      />

      <Controller
        name="username"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={"Tên đăng nhập"}
            placeholder={"Nhập tên đăng nhập"}
            value={value}
            onChange={onChange}
            error={errors.username?.message as string}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PasswordInput
            label={"Mật khẩu"}
            placeholder={"Nhập mật khẩu"}
            value={value}
            onChange={onChange}
            error={errors.password?.message as string}
          />
        )}
      />

      <Button type="submit" loading={isSubmitting} fullWidth variant="filled">
        {isEdit ? "Cập nhật" : "Thêm"}
      </Button>
    </Box>
  );
};
