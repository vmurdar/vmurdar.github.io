import { protectedContentKeys } from "./site-map";

export const PROTECTED_CONTENT_KEYS = new Set<string>(protectedContentKeys);

export function contentKey(section: string, slug: string): string {
  return `${section}/${slug}`;
}

export function isProtectedContent(section: string, slug: string): boolean {
  return PROTECTED_CONTENT_KEYS.has(contentKey(section, slug));
}

export function protectedContentPaths(): string[] {
  return [...PROTECTED_CONTENT_KEYS].map((key) => `/${key}`);
}
