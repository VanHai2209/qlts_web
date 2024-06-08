import { DepartmentForm } from "@/components/features/category-management/departments/components/DepartmentForm";
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
        Tạo mới phòng ban
      </Text>

      <DepartmentForm />
    </Stack>
  );
};

export default CreatePage;
