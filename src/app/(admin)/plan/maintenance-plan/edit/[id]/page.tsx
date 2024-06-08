import { DepartmentForm } from "@/components/features/category-management/departments/components/DepartmentForm";
import { MaintenanceForm } from "@/components/features/plan/maintenance-plan/components/MaintenanceForm";
import { request } from "@/libs/request";
import { Stack, Text } from "@mantine/core";
import React from "react";

const EditPage = async () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Sửa kế hoạch bảo trì
      </Text>

      <MaintenanceForm />
    </Stack>
  );
};

export default EditPage;
