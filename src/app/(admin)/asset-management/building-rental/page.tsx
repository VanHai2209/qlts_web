import { BuildingRentalManagement } from "@/components/features/building-rental/BuildingRentalManagement";
import { Stack, Text } from "@mantine/core";
import React from "react";

const DepartmentsPage = () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Quản lý khai thác cho thuê nhà
      </Text>

      <BuildingRentalManagement />
    </Stack>
  );
};

export default DepartmentsPage;
