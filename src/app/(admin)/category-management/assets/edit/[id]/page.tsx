import { AssetForm } from "@/components/features/category-management/assets/components/AssetForm";
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
        Sửa tài sản
      </Text>

      <AssetForm />
    </Stack>
  );
};

export default EditPage;
