import { RecommendedShoppingManagement } from "@/components/features/plan/recommended-shopping-plan";
import { Stack, Text } from "@mantine/core";
import React from "react";

const Page = () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Quản lý mua sắm được kiến nghị
      </Text>

      <RecommendedShoppingManagement />
    </Stack>
  );
};

export default Page;
