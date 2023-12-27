import { USER_ROLE } from ".";

export const NavbarItems = (role: string) => {
  const defaultMenu = [
    {
      label: <span>Home</span>,
      href: `/`,
      key: `/`,
    },
    {
      label: <span>Watch</span>,
      href: `/watches`,
      key: `/watches`,
    },
    {
      label: <span>Cart</span>,
      href: `/cart`,
      key: `/cart`,
    },
    {
      label: <span>Blogs</span>,
      href: `/blogs`,
      key: `/blogs`,
    },
    {
      label: <span>profile</span>,
      href: `/profile`,
      key: `/profile`,
    },
  ];

  const UserItems = [
    {
      label: <span>Home</span>,
      href: `/`,
      key: `/`,
    },
    {
      label: <span>Watch</span>,
      href: `/watches`,
      key: `/watches`,
    },
    {
      label: <span>Cart</span>,
      href: `/cart`,
      key: `/cart`,
    },
    {
      label: <span>Blogs</span>,
      href: `/blogs`,
      key: `/blogs`,
    },
    {
      label: <span>profile</span>,
      href: `/profile`,
      key: `/profile`,
    },
  ];

  const AdminItems = [
    {
      label: <span>Manage User</span>,
      href: `/${role}/management/user`,
      key: `/${role}/management/user`,
    },
    {
      label: <span>Manage Service</span>,
      href: `/${role}/management/watches`,
      key: `/${role}/management/watches`,
    },
    {
      label: <span>Manage Content</span>,
      href: `/${role}/management/blogs`,
      key: `/${role}/management/blogs`,
    },
    {
      label: <span>profile</span>,
      href: `/${role}/profile`,
      key: `/${role}/profile`,
    },
  ];

  const SuperAdminItems = [
    {
      label: <span>Manage Admins</span>,
      href: `/${role}/management/admins`,
      key: `/${role}/management/admins`,
    },
    {
      label: <span>profile</span>,
      href: `/profile`,
      key: `/profile`,
    },
  ];

  if (role === USER_ROLE.USER) return UserItems;
  else if (role === USER_ROLE.ADMIN) return AdminItems;
  else if (role === USER_ROLE.SUPER_ADMIN) return SuperAdminItems;
  else return defaultMenu;
};
