import { LiquidationForm } from "@/components/features/liquidation/components/LiquidationForm";
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
        Sửa thanh lý tài sản
      </Text>

      <LiquidationForm />
    </Stack>
  );
};

export default EditPage;
