import { RecommendedShoppingMaintenanceManagement } from "@/components/features/plan/recommended-shopping-maintenance-plan";
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
        Quản lý bảo trì, thay mới được kiến nghị
      </Text>

      <RecommendedShoppingMaintenanceManagement />
    </Stack>
  );
};

export default DepartmentsPage;
