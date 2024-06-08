import { SupplierForm } from "@/components/features/category-management/suppliers/components/SupplierForm";
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
        Tạo mới nhà cung cấp
      </Text>

      <SupplierForm />
    </Stack>
  );
};

export default CreatePage;
