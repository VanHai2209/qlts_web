import { SpecialManagement } from "@/components/features/special/SpecialManagement";
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
        Quản lý tài sản đặc thù
      </Text>

      <SpecialManagement />
    </Stack>
  );
};

export default DepartmentsPage;
