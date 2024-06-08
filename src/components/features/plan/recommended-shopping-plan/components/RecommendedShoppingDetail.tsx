"use client";

import { request } from "@/libs/request";
import { Button, Flex, Grid, Stack, Text, TextInput } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import { notifications } from "@mantine/notifications";
import { IRecommendPlans } from "@/libs/types/plan";
import { STATUS_ASSET_OBJ } from "@/libs/utils/constants";

export const RecommendedShoppingDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [evaluation, setEvaluate] = React.useState("");

  const { data, isLoading } = useQuery<IRecommendPlans>({
    queryKey: ["recommended-shopping-plan", id],
    queryFn: async () => {
      const res = await request.get(`/plan/recommended-shopping/${id}`);
      return res.data;
    },
  });

  const manager = data?.Department?.User.find(
    (user) => user?.role === "MANAGER"
  );

  const { mutate } = useMutation({
    mutationFn: async ({ status }: { status: "APPROVED" | "REJECTED" }) => {
      if (!evaluation) {
        throw new Error("Vui lòng nhập đánh giá kế hoạch");
      }

      const res = await request.patch(
        `/plan/recommended-shopping/${id}/status`,
        {
          status,
          evaluation,
        }
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recommended-shopping-plan"],
      });
      notifications.show({
        title: "Thành công",
        message: "Thao tác thành công",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Lỗi",
        message: error.message,
        color: "red",
      });
    },
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid>
          <Grid.Col span={6}>
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin phòng ban
            </Text>
            <Text>Tên phòng: {data?.Department?.name}</Text>
            <Text>Địa chỉ: {data?.Department?.address}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
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

          <Grid.Col span={12}>
            <Text style={{ fontSize: "16", fontWeight: "bold" }}>
              Thông tin mua sắm
            </Text>

            <Text>Tên tài sản: {data?.RecommendPlanAsset?.asset_name}</Text>
            <Text>
              Trạng thái:{" "}
              {
                STATUS_ASSET_OBJ[
                  data?.RecommendPlanAsset
                    ?.status as keyof typeof STATUS_ASSET_OBJ
                ]
              }
            </Text>
            <Text>
              Nhà cung cấp: {data?.RecommendPlanAsset?.Supplier?.name}
            </Text>
            {data?.implemention_date && (
              <Text>
                Ngày thực hiện:{" "}
                {format(new Date(data.implemention_date), "dd/MM/yyyy")}
              </Text>
            )}
            {data?.petition_date && (
              <Text>
                Ngày kiến nghị:{" "}
                {format(new Date(data.petition_date), "dd/MM/yyyy")}
              </Text>
            )}

            <Text>Mô tả kế hoạch: {data?.description_plan}</Text>

            {data?.evaluation && (
              <Text>Đánh giá kế hoạch: {data?.evaluation}</Text>
            )}
          </Grid.Col>

          {!data?.evaluation && (
            <Stack
              style={{
                padding: "8px",
                gap: "8px",
              }}
            >
              <Text style={{ fontSize: "16", fontWeight: "bold" }}>
                Thao tác
              </Text>

              <TextInput
                label="Đánh giá kế hoạch"
                placeholder="Nhập đánh giá kế hoạch"
                onChange={(e) => setEvaluate(e.currentTarget.value)}
              />

              <Flex gap={12}>
                <Button onClick={() => mutate({ status: "APPROVED" })}>
                  Phê duyệt
                </Button>
                <Button
                  onClick={() => mutate({ status: "REJECTED" })}
                  color="red"
                >
                  Từ chối
                </Button>
              </Flex>
            </Stack>
          )}
        </Grid>
      )}
    </div>
  );
};
