import { WorkerForm } from "@/components/features/category-management/workers/components/WorkerForm";
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
        Tạo mới nhân viên
      </Text>

      <WorkerForm departments={res.data.data} />
    </Stack>
  );
};

export default CreatePage;
