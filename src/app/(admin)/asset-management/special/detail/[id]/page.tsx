import { SpecialDetail } from "@/components/features/special/components/SpecialDetail";
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
        Chi tiết tài sản đặc thù
      </Text>

      <SpecialDetail />
    </Stack>
  );
};

export default DetailPage;
