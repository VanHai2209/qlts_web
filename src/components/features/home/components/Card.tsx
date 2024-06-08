import {
  Card,
  DefaultMantineColor,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React from "react";

interface Props {
  icon: React.FC<any>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: DefaultMantineColor;
}

export const CardOverview = ({
  icon: Icon,
  title,
  description,
  bgColor,
  iconColor,
}: Props) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <ThemeIcon radius="xl" size="xl" color={iconColor}>
        <Icon
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      </ThemeIcon>
      <Text
        style={{
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        {title}
      </Text>
      <Title
        order={5}
        style={{
          color: "#151D48",
          fontSize: "24px",
        }}
      >
        {description}
      </Title>
    </Card>
  );
};
