export const mainNavigation = [
  {
    label: "教材を探す",
    path: "/library/",
    sections: ["/library/", "/topics/", "/series/", "/learn/"],
  },
  { label: "学習ルート", path: "/paths/", sections: ["/paths/", "/start/"] },
  { label: "新着・更新", path: "/updates/", sections: ["/updates/"] },
] as const;
export function isNavigationCurrent(
  pathname: string,
  base: string,
  sections: readonly string[],
) {
  return sections.some((section) => pathname.startsWith(`${base}${section}`));
}
