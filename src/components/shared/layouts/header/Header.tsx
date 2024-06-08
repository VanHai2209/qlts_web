"use client";

import { Group, Burger, Text, Flex, Image } from "@mantine/core";
import classes from "./Header.module.css";
import { Auth } from "./components/Auth";
import Logo from "public/logo.png";
interface Props {
  toggle?: () => void;
  opened?: boolean;
}

export function Header({ opened, toggle }: Props) {
  return (
    <header className={classes.header}>
      <Group
        h="100%"
        px="md"
        style={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Flex gap={12}>
          <Image
            src={Logo.src}
            alt="logo"
            style={{
              display: "block",
              height: "40px",
            }}
          />

          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            QLTS
          </Text>
        </Flex>

        <Flex gap={4} align={"center"}>
          <Auth />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Flex>
      </Group>
    </header>
  );
}
