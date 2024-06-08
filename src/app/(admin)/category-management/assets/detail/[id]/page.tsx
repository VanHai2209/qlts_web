import { AssetForm } from "@/components/features/category-management/assets/components/AssetForm";
import { Stack, Text } from "@mantine/core";
import React from "react";

const DetailPage = async () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Chi tiết tài sản
      </Text>

      <AssetForm />
    </Stack>
  );
};

export default DetailPage;
