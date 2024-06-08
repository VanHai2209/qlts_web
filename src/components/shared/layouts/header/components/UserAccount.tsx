import cx from "clsx";
import { useState } from "react";
import { Avatar, UnstyledButton, Group, Text, Menu, rem } from "@mantine/core";
import { IconLogout, IconChevronDown } from "@tabler/icons-react";
import classes from "./Style.module.css";
import { signOut } from "next-auth/react";
import { modals } from "@mantine/modals";

interface Props {
  user?: any;
}

export function UserAccount({ user }: Props) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const openSignOutModal = () =>
    modals.openConfirmModal({
      title: "Đăng xuất",
      centered: true,
      children: <Text size="sm">Bạn có chắc chắn muốn đăng xuất không?</Text>,
      labels: { confirm: "Đăng xuất", cancel: "Huỷ" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => signOut({ callbackUrl: "/login" }),
    });

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
        >
          <Group gap={7}>
            <Avatar
              src={
                "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
              }
              alt={"avatar"}
              radius="xl"
              size={20}
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user?.name}
            </Text>
            <IconChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={openSignOutModal}
        >
          Đăng xuất
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
