import { DepartmentForm } from "@/components/features/category-management/departments/components/DepartmentForm";
import { LiquidationForm } from "@/components/features/liquidation/components/LiquidationForm";
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
        Tạo mới thanh lý tài sản
      </Text>

      <LiquidationForm />
    </Stack>
  );
};

export default CreatePage;
