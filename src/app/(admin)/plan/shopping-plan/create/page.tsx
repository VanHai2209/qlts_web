import { ShoppingForm } from "@/components/features/plan/shopping-plan/components/ShoppingForm";
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
        Tạo mới kế hoạch mua sắm
      </Text>

      <ShoppingForm />
    </Stack>
  );
};

export default CreatePage;
