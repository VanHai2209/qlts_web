import { AssetsManagement } from "@/components/features/category-management/assets";
import { DepartmentsManagement } from "@/components/features/category-management/departments";
import { MaintenanceManagement } from "@/components/features/plan/maintenance-plan";
import { Stack, Text } from "@mantine/core";
import React from "react";

const DepartmentsPage = () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Quản lý kế hoạch bảo trì
      </Text>

      <MaintenanceManagement />
    </Stack>
  );
};

export default DepartmentsPage;
