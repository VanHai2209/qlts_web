import { DepartmentForm } from "@/components/features/category-management/departments/components/DepartmentForm";
import { request } from "@/libs/request";
import { Stack, Text } from "@mantine/core";
import React from "react";

const EditPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const res = await request(`/category-management/departments/${params.id}`);

  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Sửa phòng ban
      </Text>

      <DepartmentForm data={res.data} />
    </Stack>
  );
};

export default EditPage;
