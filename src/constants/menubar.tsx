import { USER_ROLE } from ".";

export const NavbarItems = (role: string) => {
  const UserItems = [
    {
      label: <span>Home</span>,
      href: `/`,
      key: `/`,
    },
    {
      label: <span>Cart</span>,
      href: `/${role}/cart`,
      key: `/${role}/cart`,
    },
    {
      label: <span>Watch</span>,
      href: `/${role}/watches`,
      key: `/${role}/watches`,
    },
    {
      label: <span>Blogs</span>,
      href: `/${role}/blogs`,
      key: `/${role}/blogs`,
    },
    {
      label: <span>profile</span>,
      href: `/${role}/profile`,
      key: `/${role}/profile`,
    },
  ];

  const AdminItems = [
    {
      label: <span>User Management</span>,
      href: `/${role}/management/user`,
      key: `/${role}/management/user`,
    },
    {
      label: <span>Service Management</span>,
      href: `/${role}/management/watches`,
      key: `/${role}/management/watches`,
    },
    {
      label: <span>Content Management</span>,
      href: `/${role}/management/blog`,
      key: `/${role}/management/blog`,
    },
    {
      label: <span>profile Management</span>,
      href: `/${role}/profile`,
      key: `/${role}/profile`,
    },
  ];

  const SuperAdminItems = [
    {
      label: <span>profile Management</span>,
      href: `/${role}/profile`,
      key: `/${role}/profile`,
    },
    {
      label: <span>Manage Admins</span>,
      href: `/${role}/management/admin`,
      key: `/${role}/management/admin`,
    },
  ];

  if (role === USER_ROLE.USER) return UserItems;
  else if (role === USER_ROLE.ADMIN) return AdminItems;
  else if (role === USER_ROLE.SUPER_ADMIN) return SuperAdminItems;
};
