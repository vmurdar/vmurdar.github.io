import { getCollection } from 'astro:content';

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function normalizePath(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${cleanPath}`;
}

// 1. Fetch ALL pages from the single collection
const allPages = await getCollection('pages');

// 2. Group the pages by their folder name (which acts as the top-level menu)
const menuMap = new Map<string, any[]>();

allPages.forEach(page => {
  if (page.data.draft) return;
  
  // Astro IDs look like "health/hiit" or "meTube/clips". 
  // We split by the slash to find the top-level folder.
  const parts = page.id.split('/');
  const section = parts[0]; 

  if (!menuMap.has(section)) {
    menuMap.set(section, []);
  }
  menuMap.get(section)!.push(page);
});

// 3. Build the navigation array dynamically
export const navItems: NavItem[] = Array.from(menuMap.entries()).map(([section, docs]) => {
  return {
    // Simply use the exact folder name from the file system
    label: section,
    children: docs
      .sort((a, b) => a.data.navOrder - b.data.navOrder)
      .map(doc => ({
        label: doc.data.title,
        href: normalizePath(`/${doc.id}`) 
      }))
  };
});