import { BuildingRentalForm } from "@/components/features/building-rental/components/BuildingRentalForm";
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
        Sửa khai thác cho thuê tòa nhà
      </Text>

      <BuildingRentalForm />
    </Stack>
  );
};

export default EditPage;
