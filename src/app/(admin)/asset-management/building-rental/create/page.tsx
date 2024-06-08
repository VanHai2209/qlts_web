import { BuildingRentalForm } from "@/components/features/building-rental/components/BuildingRentalForm";
import { Stack, Text } from "@mantine/core";
import React from "react";

const CreatePage = () => {
  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Tạo mới khai thác cho thuê tòa nhà
      </Text>

      <BuildingRentalForm />
    </Stack>
  );
};

export default CreatePage;
