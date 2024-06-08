import { DepartmentDetail } from "@/components/features/category-management/departments/components/DepartmentDetail";
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
        Chi tiết khai thác cho thuê tòa nhà
      </Text>

      <DepartmentDetail />
    </Stack>
  );
};

export default DetailPage;
