import { AssetsManagement } from "@/components/features/category-management/assets";
import { Stack, Text } from "@mantine/core";
import React from "react";

const AssetsPage = () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Quản lý danh mục tài sản
      </Text>

      <AssetsManagement />
    </Stack>
  );
};

export default AssetsPage;
