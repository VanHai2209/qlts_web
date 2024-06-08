"use client";

import {
  Box,
  Collapse,
  Group,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import classes from "./NavbarLinksGroup.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface LinksGroupProps {
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
  icon?: React.FC<any>;
}

export function LinksGroup({
  label,
  initiallyOpened,
  links,
  link,
  icon: Icon,
}: LinksGroupProps) {
  const pathname = usePathname();
  const [active, setActive] = useState<string>(pathname);
  const router = useRouter();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      className={`${classes.link} ${
        active === link.link ? classes.linkActive : ""
      }`}
      href={link.link}
      key={link.label}
    >
      {link.label}
    </Link>
  ));

  const onClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={`${classes.control} ${
          active === link ? classes.linkActive : ""
        }`}
      >
        <Group
          style={{
            justifyContent: "space-between",
            gap: 0,
          }}
        >
          <Box
            onClick={onClick}
            style={{ display: "flex", alignItems: "center" }}
          >
            {Icon && (
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
            )}

            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
