export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Easy Shop",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Shop",
      href: "/all-shop",
    },
    // {
    //   label: "Viewed Products",
    //   href: "/viewed-products",
    // },
    {
      label: "Flash",
      href: "/flash-sale",
    },

    {
      label: "Compare",
      href: "/compare-products",
    },
  ],
  navMenuItems: [
    {
      label: "Shop",
      href: "/all-shop",
    },
    // {
    //   label: "Viewed Products",
    //   href: "/viewed-products",
    // },
    {
      label: "Flash",
      href: "/flash-sale",
    },

    {
      label: "Compare",
      href: "/compare-products",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
