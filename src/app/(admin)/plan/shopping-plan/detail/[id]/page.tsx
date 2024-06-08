import { ShoppingDetail } from "@/components/features/plan/shopping-plan/components/ShoppingDetail";
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
        Chi tiết kế hoạch mua sắm
      </Text>

      <ShoppingDetail />
    </Stack>
  );
};

export default DetailPage;
