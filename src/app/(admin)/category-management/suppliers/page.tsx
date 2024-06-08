import { AssetsManagement } from "@/components/features/category-management/assets";
import { SuppliersManagement } from "@/components/features/category-management/suppliers";
import { Stack, Text } from "@mantine/core";
import React from "react";

const SuppliersPage = () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Quản lý danh mục nhà cung cấp
      </Text>

      <SuppliersManagement />
    </Stack>
  );
};

export default SuppliersPage;
