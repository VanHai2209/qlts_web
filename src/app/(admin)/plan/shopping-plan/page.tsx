import { ShoppingManagement } from "@/components/features/plan/shopping-plan";
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
        Quản lý kế hoạch mua sắm
      </Text>

      <ShoppingManagement />
    </Stack>
  );
};

export default DepartmentsPage;
