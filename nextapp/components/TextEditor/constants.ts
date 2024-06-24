// b, em, sub, u, a, i
export const TAGS = {
  BOLD: 'b',
  SUBSCRIPT: 'sub',
  UNDERLINE: 'u',
  ANCHOR: 'a',
  ITALIC: 'i',
  EMPHASIZED: 'em',
} as const;

export type TagName = (typeof TAGS)[keyof typeof TAGS];

export const TAGS_ARRAY: TagName[] = Object.values(TAGS);
