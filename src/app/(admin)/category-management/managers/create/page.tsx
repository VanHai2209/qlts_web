import { ManagerForm } from "@/components/features/category-management/managers/components/ManagerForm";
import { request } from "@/libs/request";
import { Stack, Text } from "@mantine/core";
import React from "react";

const CreatePage = async () => {
  const res = await request.get("/category-management/departments");

  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Tạo mới nhà người quản lý
      </Text>

      <ManagerForm departments={res.data.data} />
    </Stack>
  );
};

export default CreatePage;
