import { RecommendedShoppingMaintenanceForm } from "@/components/features/plan/recommended-shopping-maintenance-plan/components/RecommendedShoppingMaintenanceForm";
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
        Sửa bảo trì thay mới được kiến nghị
      </Text>

      <RecommendedShoppingMaintenanceForm />
    </Stack>
  );
};

export default EditPage;
