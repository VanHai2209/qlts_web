import { RecommendedShoppingMaintenanceDetail } from "@/components/features/plan/recommended-shopping-maintenance-plan/components/RecommendedShoppingMaintenanceDetail";
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
        Chi tiết bảo trì thay mới được kiến nghị
      </Text>

      <RecommendedShoppingMaintenanceDetail />
    </Stack>
  );
};

export default DetailPage;
