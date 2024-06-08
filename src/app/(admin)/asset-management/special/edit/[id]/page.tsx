import { DepartmentForm } from "@/components/features/category-management/departments/components/DepartmentForm";
import { SpecialForm } from "@/components/features/special/components/SpecialForm";
import { Stack, Text } from "@mantine/core";
import React from "react";

const EditPage = async () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Sửa tài sản đặc thù
      </Text>

      <SpecialForm />
    </Stack>
  );
};

export default EditPage;
