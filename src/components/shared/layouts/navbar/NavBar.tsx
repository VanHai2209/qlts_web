"use client";

import classes from "./Navbar.module.css";
import { Transition } from "@mantine/core";
import { LinksGroup } from "../navbar-links-group/NavbarLinksGroup";
import {
  IconNotes,
  IconCalendarStats,
  IconBuildingEstate,
  IconReportAnalytics,
  IconHome,
  IconCategory,
  IconBasketX,
} from "@tabler/icons-react";

const superAdminSideBar = [
  {
    label: "Trang chủ",
    icon: IconHome,
    initiallyOpened: true,
    link: "/",
  },
  {
    label: "Quản lý danh mục",
    icon: IconCategory,
    links: [
      {
        label: "Quản lý danh mục tài sản",
        link: "/category-management/assets",
      },
      {
        label: "Quản lý danh mục nhà cung cấp",
        link: "/category-management/suppliers",
      },
      {
        label: "Quản lý danh mục phòng ban",
        link: "/category-management/departments",
      },
      {
        label: "Quản lý danh mục người quản lý",
        link: "/category-management/managers",
      },
      {
        label: "Quản lý danh mục nhân viên",
        link: "/category-management/workers",
      },
    ],
  },
  {
    label: "Quản lý kế hoạch",
    icon: IconCalendarStats,
    links: [
      {
        label: "Kế hoạch mua sắm được kiến nghị",
        link: "/plan/recommended-shopping-plan",
      },
      {
        label: "Kế hoạch bảo trì, thay mới được kiến nghị",
        link: "/plan/recommended-shopping-maintenance-plan",
      },
      { label: "Kế hoạch mua sắm", link: "/plan/shopping-plan" },
      { label: "Kế hoạch bảo trì", link: "/plan/maintenance-plan" },
    ],
  },
  {
    label: "Quản lý thanh lý tài sản",
    link: "/asset-management/liquidation",
    icon: IconBasketX,
  },
  {
    label: "Quản lý tài sản đặc thù",
    link: "/asset-management/special",
    icon: IconNotes,
  },
  {
    label: "Quản lý khai thác cho thuê tòa nhà",
    link: "/asset-management/building-rental",
    icon: IconBuildingEstate,
  },
  {
    label: "Báo cáo phân tích",
    link: "/analysis-report",
    icon: IconReportAnalytics,
  },
];

interface Props {
  toggle?: () => void;
  opened?: boolean;
}

export const Navbar = ({ opened }: Props) => {
  const links = superAdminSideBar.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <>
      <nav className={classes.navbar__desktop}>
        <div className={classes.linksInner}>{links}</div>
      </nav>

      <Transition
        transition="pop-top-left"
        duration={200}
        mounted={!!opened}
        keepMounted={true}
      >
        {(styles) => (
          <nav style={styles}>
            <div className={classes.linksInner}>{links}</div>
          </nav>
        )}
      </Transition>
    </>
  );
};
