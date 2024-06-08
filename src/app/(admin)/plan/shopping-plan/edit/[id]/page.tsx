import { ShoppingForm } from "@/components/features/plan/shopping-plan/components/ShoppingForm";
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
        Sửa kế hoạch mua sắm
      </Text>

      <ShoppingForm />
    </Stack>
  );
};

export default EditPage;
