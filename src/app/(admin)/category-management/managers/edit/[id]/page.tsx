import { ManagerForm } from "@/components/features/category-management/managers/components/ManagerForm";
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
  const [res, departments] = await Promise.all([
    request.get(`/category-management/managers/${params.id}`),
    request.get("/category-management/departments"),
  ]);

  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Sửa người quản lý
      </Text>

      <ManagerForm data={res.data} departments={departments.data.data} />
    </Stack>
  );
};

export default EditPage;
