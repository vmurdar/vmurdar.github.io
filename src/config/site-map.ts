// src/config/site-map.ts
export interface SiteMapLink {
  label: string;
  slug?: string;
  href?: string;
  protected?: boolean;
}

export interface SiteMapSection extends SiteMapLink {
  children?: SiteMapLink[];
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const siteMap = {
  health: {
    label: "Health",
    children: [
      { label: "HIIT for Oldies", slug: "hiit" },
      { label: "Are you having a Stroke?", slug: "tia" },
    ],
  },
  imagery: {
    label: "Imagery",
    children: [{ label: "Gallery", href: "/under-construction" }],
  },
  meTube: {
    label: "meTube",
    children: [{ label: "Clips", slug: "clips", protected: true }],
  },
  tech: { label: "Tech", href: "/under-construction" },
} as const satisfies Record<string, SiteMapSection>;

export type SectionKey = keyof typeof siteMap;

// FIX: Export the keys so [slug].astro can use them for validation
export const sectionKeys = Object.keys(siteMap) as SectionKey[];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function normalizePath(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${cleanPath}`;
}

function toHref(section: SectionKey, item: SiteMapLink): string {
  if (item.href) return normalizePath(item.href);
  if (item.slug) return normalizePath(`/${section}/${item.slug}`);
  return normalizePath("/under-construction");
}

export function buildNavItems(): NavItem[] {
  return sectionKeys.map((section) => {
    const menu = siteMap[section] as SiteMapSection; 
    if (menu.children && menu.children.length > 0) {
      return {
        label: menu.label,
        children: menu.children.map((child: SiteMapLink) => ({
          label: child.label,
          href: toHref(section, child),
        })),
      };
    }
    return { label: menu.label, href: toHref(section, menu) };
  });
}

export const protectedContentKeys = sectionKeys.flatMap(section => {
  const menu = siteMap[section] as SiteMapSection;
  const keys: string[] = [];
  if (menu.protected && menu.slug) keys.push(`${section}/${menu.slug}`);
  menu.children?.forEach((child: SiteMapLink) => {
    if (child.protected && child.slug) keys.push(`${section}/${child.slug}`);
  });
  return keys;
});