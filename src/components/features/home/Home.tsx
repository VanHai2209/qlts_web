"use client";

import { Box, Grid, Stack, Title } from "@mantine/core";
import React from "react";
import { CardOverview } from "./components/Card";
import { IconBooks, IconBuilding, IconUser } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/request";
import { PieChartSupplier } from "./components/PieChartSupplier";

interface IOverview {
  totalManagers: number;
  totalWorkers: number;
  totalAssets: number;
  totalDepartments: number;
}

export const Home = () => {
  const { data, isLoading } = useQuery<IOverview>({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await request("/category-management/overview");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack>
      <Box>
        <Title
          order={3}
          style={{
            color: "rgb(20, 107, 210)",
          }}
        >
          THỐNG KÊ
        </Title>

        <Grid mt={16}>
          <Grid.Col
            span={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <CardOverview
              icon={IconUser}
              title="Quản lý"
              description={data?.totalManagers + ""}
              bgColor="#FFE2E5"
              iconColor="red"
            />
          </Grid.Col>
          <Grid.Col
            span={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <CardOverview
              icon={IconUser}
              title="Nhân viên"
              description={data?.totalWorkers + ""}
              bgColor="#FFF4DE"
              iconColor="yellow"
            />
          </Grid.Col>

          <Grid.Col
            span={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <CardOverview
              icon={IconBooks}
              title="Tài sản"
              description={data?.totalAssets + ""}
              bgColor="#DCFCE7"
              iconColor="lime"
            />
          </Grid.Col>

          <Grid.Col
            span={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <CardOverview
              icon={IconBuilding}
              title="Phòng ban"
              description={data?.totalDepartments + ""}
              bgColor="#F3E8FF"
              iconColor="grape"
            />
          </Grid.Col>
        </Grid>
      </Box>

      <Box mt={16}>
        <PieChartSupplier />
      </Box>
    </Stack>
  );
};
