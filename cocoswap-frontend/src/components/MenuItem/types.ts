import { Colors } from '@pancakeswap/uikit'

export type MenuItemVariant = "default" | "subMenu";

export interface MenuItemProps {
  isActive?: boolean;
  href?: string;
  variant?: MenuItemVariant;
  statusColor?: keyof Colors;
}

export type StyledMenuItemProps = {
  $isActive?: boolean;
  $variant?: MenuItemVariant;
  $statusColor?: keyof Colors;
};
