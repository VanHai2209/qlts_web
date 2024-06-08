import { SupplierForm } from "@/components/features/category-management/suppliers/components/SupplierForm";
import { request } from "@/libs/request";
import { Stack, Text } from "@mantine/core";
import React from "react";

const EditPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const res = await request(`/category-management/suppliers/${params.id}`);

  return (
    <Stack>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Sửa nhà cung cấp
      </Text>

      <SupplierForm data={res.data} />
    </Stack>
  );
};

export default EditPage;
