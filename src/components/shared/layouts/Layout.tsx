"use client";

import { AppShell, AppShellMain } from "@mantine/core";
import classes from "@/components/shared/layouts/Layout.module.css";
import { Header } from "@/components/shared/layouts/header";
import { MainPaper } from "@/components/shared/layouts/main-paper";
import { Navbar } from "./navbar/NavBar";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  const { status } = useSession();

  if (status == "loading") {
    return null;
  }

  return (
    <AppShell
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      header={{ height: 72 }}
      padding="md"
    >
      <AppShell.Header>
        <Header toggle={toggle} opened={opened} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar opened={opened} />
      </AppShell.Navbar>

      <AppShellMain className={classes.layout}>
        <MainPaper>{children}</MainPaper>
      </AppShellMain>
    </AppShell>
  );
};

export { Layout };
