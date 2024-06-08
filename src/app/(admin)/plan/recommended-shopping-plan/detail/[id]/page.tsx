import { RecommendedShoppingDetail } from "@/components/features/plan/recommended-shopping-plan/components/RecommendedShoppingDetail";
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
        Chi tiết mua sắm được kiến nghị
      </Text>

      <RecommendedShoppingDetail />
    </Stack>
  );
};

export default DetailPage;
