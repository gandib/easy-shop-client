export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Easy Shop",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "All Products",
      href: "/all-products",
    },
    {
      label: "Flash Sale",
      href: "/flash-sale",
    },
    {
      label: "Cart",
      href: "/cart",
    },
  ],
  navMenuItems: [
    {
      label: "All Products",
      href: "/all-products",
    },
    {
      label: "Flash Sale",
      href: "/flash-sale",
    },
    {
      label: "Cart",
      href: "/cart",
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
