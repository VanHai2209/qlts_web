import { AssetsManagement } from "@/components/features/category-management/assets";
import { DepartmentsManagement } from "@/components/features/category-management/departments";
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
        Quản lý danh mục phòng ban
      </Text>

      <DepartmentsManagement />
    </Stack>
  );
};

export default DepartmentsPage;
