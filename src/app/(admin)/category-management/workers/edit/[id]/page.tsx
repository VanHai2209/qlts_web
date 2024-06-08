import { WorkerForm } from "@/components/features/category-management/workers/components/WorkerForm";
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
    request.get(`/category-management/workers/${params.id}`),
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
        Sửa nhân viên
      </Text>

      <WorkerForm data={res.data} departments={departments.data.data} />
    </Stack>
  );
};

export default EditPage;
