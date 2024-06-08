import { ManagersManagement } from "@/components/features/category-management/managers";
import { Stack, Text } from "@mantine/core";
import React from "react";

const ManagersPage = () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Quản lý danh mục nguời quản lý
      </Text>

      <ManagersManagement />
    </Stack>
  );
};

export default ManagersPage;
