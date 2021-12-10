// eslint-disable-next-line import/no-cycle
export { default as Menu } from "./Menu";
// export type { MenuItemsType } from "../../components/MenuItems/types";
// export { DropdownMenuItemType } from "../../components/DropdownMenu/types";
// export type { FooterLinkType } from "../../components/Footer/types";
// eslint-disable-next-line import/no-cycle
export type { NavProps, Language } from "./types";
export type FooterLinkType = {
  label: string;
  items: { label: string; href?: string; isHighlighted?: boolean }[];
};
export interface StyledDropdownMenuItemProps extends React.ComponentPropsWithoutRef<"button"> {
  disabled?: boolean;
  isActive?: boolean;
}

export enum DropdownMenuItemType {
  INTERNAL_LINK,
  EXTERNAL_LINK,
  BUTTON,
  DIVIDER,
}

export interface LinkStatus {
  text: string;
  color: any;
}
export interface DropdownMenuItems {
  label?: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: any;
  status?: any;
  disabled?: boolean;
  iconName?: string;
  isMobileOnly?: boolean;
}

export type MenuItemsType = {
  label: string;
  href: string;
  icon?: string;
  items?: DropdownMenuItems[];
  showOnMobile?: boolean;
  showItemsOnMobile?: boolean;
};
