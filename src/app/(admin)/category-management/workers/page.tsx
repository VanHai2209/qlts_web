import { WorkersManagement } from "@/components/features/category-management/workers";
import { Stack, Text } from "@mantine/core";
import React from "react";

const WorkersPage = () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Quản lý danh mục nhân viên
      </Text>

      <WorkersManagement />
    </Stack>
  );
};

export default WorkersPage;
