import { ReactElement } from "react";

export type SubMenuItemsType = {
  label: string;
  href: string;
  iconName?: string;
  isMobileOnly?: boolean;
};



export interface Language {
  code: string;
  language: string;
  locale: string;
}

export interface LinkStatus {
  text: string;
  color: any;
}

export interface NavProps {
  userMenu?: ReactElement;
  banner?: ReactElement;
  globalMenu?: ReactElement;
  links: Array<any>;
  subLinks: Array<any>;
  footerLinks: Array<any>;
  activeItem: string;
  activeSubItem: string;
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
  cakePriceUsd?: number;
  currentLang: string;
  buyCakeLabel: string;
  langs: Language[];
  setLang: (lang: Language) => void;
}
