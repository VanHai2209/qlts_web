import { SpecialForm } from "@/components/features/special/components/SpecialForm";
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
        Tạo mới tài sản đặc thù
      </Text>

      <SpecialForm />
    </Stack>
  );
};

export default CreatePage;
