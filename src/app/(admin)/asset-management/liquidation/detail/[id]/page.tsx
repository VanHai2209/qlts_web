import { LiquidationDetail } from "@/components/features/liquidation/components/LiquidationDetail";
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
        Chi tiết phòng ban
      </Text>

      <LiquidationDetail />
    </Stack>
  );
};

export default DetailPage;
