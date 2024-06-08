import { LiquidationManagement } from "@/components/features/liquidation/LiquidationManagement";
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
        Quản lý thanh lý tài sản
      </Text>

      <LiquidationManagement />
    </Stack>
  );
};

export default DepartmentsPage;
