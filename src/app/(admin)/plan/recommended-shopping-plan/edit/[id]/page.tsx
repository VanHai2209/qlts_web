import { RecommendedShoppingForm } from "@/components/features/plan/recommended-shopping-plan/components/RecommendedShoppingForm";
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
        Sửa mua sắm được kiến nghị
      </Text>

      <RecommendedShoppingForm />
    </Stack>
  );
};

export default EditPage;
