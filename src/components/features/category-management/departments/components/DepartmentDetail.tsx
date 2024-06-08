"use client";

import { request } from "@/libs/request";
import { IAsset, IDepartment } from "@/libs/types/category";
import { Box, Button, Flex, Grid, Select, Text } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import { notifications } from "@mantine/notifications";
import { STATUS_DEPARTMENT_OBJ } from "@/libs/utils/constants";

export const DepartmentDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<IDepartment>({
    queryKey: ["departments", id],
    queryFn: async () => {
      const res = await request.get(`/category-management/departments/${id}`);
      return res.data;
    },
  });

  const { data: departments } = useQuery<IDepartment[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await request.get("/category-management/departments");
      return res.data.data;
    },
  });

  const manager = data?.User.find((user) => user.role === "MANAGER");

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid>
          <Grid.Col
            span={6}
            style={{
              border: "1px solid #eaeaea",
            }}
          >
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin phòng ban
            </Text>
            <Text>Tên phòng: {data?.name}</Text>
            <Text>Địa chỉ: {data?.address}</Text>
            {data?.status && (
              <Text>
                Trạng thái:{" "}
                {
                  STATUS_DEPARTMENT_OBJ[
                    data?.status as keyof typeof STATUS_DEPARTMENT_OBJ
                  ]
                }
              </Text>
            )}
          </Grid.Col>

          <Grid.Col
            span={6}
            style={{
              border: "1px solid #eaeaea",
            }}
          >
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin quản lý
            </Text>

            {manager ? (
              <>
                <Text>Mã quản lý: {manager?.id}</Text>
                <Text>Quản lý: {manager?.name}</Text>
                <Text>Email: {manager?.email}</Text>
              </>
            ) : (
              <Text>Không có quản lý</Text>
            )}
          </Grid.Col>

          <Grid.Col
            span={12}
            style={{
              border: "1px solid #eaeaea",
              marginTop: "16px",
            }}
          >
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin tài sản
            </Text>

            {data?.Asset && departments && data?.Asset.length > 0 ? (
              <Grid>
                {data?.Asset.map((item) => (
                  <Grid.Col span={6} key={item.id}>
                    <AssetItem
                      item={item}
                      departmentId={id as string}
                      departments={departments}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            ) : (
              <>Không có tài sản</>
            )}
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
};

const AssetItem = ({
  item,
  departmentId,
  departments,
}: {
  item: IAsset;
  departmentId: string;
  departments: IDepartment[];
}) => {
  const [selectDepartment, setSelectDepartment] = React.useState(departmentId);

  const queryClient = useQueryClient();

  const recallAsset = async () => {
    try {
      await request.post(`/category-management/assets/recall/${item.id}`);

      notifications.show({
        title: "Thu hồi tài sản thành công",
        message: `Tài sản ${item.name} đã được thu hồi thành công`,
        color: "green",
      });

      queryClient.invalidateQueries({
        queryKey: ["departments", departmentId],
      });
    } catch (error) {
      console.log(error);

      notifications.show({
        title: "Thu hồi tài sản thất bại",
        message: `Tài sản ${item.name} đã được thu hồi thất bại`,
        color: "red",
      });
    }
  };

  const handleTransfer = async () => {
    try {
      await request.post(`/category-management/assets/assign/${item.id}`, {
        department_id: +selectDepartment,
      });

      notifications.show({
        title: "Điều chỉnh tài sản thành công",
        message: `Tài sản ${item.name} đã được điều chỉnh thành công`,
      });

      queryClient.invalidateQueries({
        queryKey: ["departments", departmentId],
      });
    } catch (error) {
      console.log(error);

      notifications.show({
        title: "Điều chỉnh tài sản thất bại",
        message: `Tài sản ${item.name} đã được điều chỉnh thất bại`,
        color: "red",
      });
    }
  };

  return (
    <Box>
      <Text>Tên tài sản: {item.name}</Text>
      <Text>Mã tài sản: {item.asset_code}</Text>
      <Text>Giá nhập: {item.entry_price}</Text>
      <Text>Ngày nhập: {format(new Date(item.entry_time), "dd/MM/yyyy")}</Text>
      <Text>Mã nhà cung cấp: {item.supplier_id}</Text>

      <Button onClick={recallAsset}>Thu hồi</Button>

      <Flex mt={8} gap={8}>
        <Select
          value={selectDepartment}
          data={departments?.map((item) => ({
            value: item.id + "",
            label: item.name,
          }))}
          onChange={(value) =>
            setSelectDepartment(value ? value : selectDepartment)
          }
        />
        <Button
          color="red"
          disabled={selectDepartment == departmentId}
          onClick={handleTransfer}
        >
          Điều chuyển
        </Button>
      </Flex>
    </Box>
  );
};
