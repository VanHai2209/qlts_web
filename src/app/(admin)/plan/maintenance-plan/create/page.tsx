import { DepartmentForm } from "@/components/features/category-management/departments/components/DepartmentForm";
import { MaintenanceForm } from "@/components/features/plan/maintenance-plan/components/MaintenanceForm";
import { Stack, Text } from "@mantine/core";
import React from "react";

const CreatePage = () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Tạo mới kế hoạch bảo trì
      </Text>

      <MaintenanceForm />
    </Stack>
  );
};

export default CreatePage;
