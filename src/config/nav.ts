export interface NavItem {
	label: string;
	href?: string;
	children?: NavItem[];
}

export const navItems = [
  {
    label: "Health",
    children: [
      { label: "HIIT for Oldies", href: "/health/hiit" },
      { label: "Are you having a Stroke?", href: "/health/tia" },
    ],
  },
  {
    label: "Imagery",
    children: [
    { label: "Gallery", href: "/under-construction" },
    ]
  },
  {
    label: "meTube",
    children: [
		{ label: "Clips", href: "/meTube/clips" },
    ],
  },
  {
    label: "Tech",
    href: "/under-construction",
  },
];