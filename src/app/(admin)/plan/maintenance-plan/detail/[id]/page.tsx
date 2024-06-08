import { DepartmentDetail } from "@/components/features/category-management/departments/components/DepartmentDetail";
import { MaintenanceDetail } from "@/components/features/plan/maintenance-plan/components/MaintenanceDetail";
import { Stack, Text } from "@mantine/core";
import React from "react";

const DetailPage = async () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Chi tiết kế hoạch bảo trì
      </Text>

      <MaintenanceDetail />
    </Stack>
  );
};

export default DetailPage;
