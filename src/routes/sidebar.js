const iconClasses = `h-6 w-6 text-white`;

const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: (
      <img src="/icons/dashboard.svg" alt="Dashboard" className={iconClasses} />
    ),
    name: "Home",
  },

  {
    path: "/app/companies", // Added /app prefix
    icon: (
      <img src="/icons/companies.svg" alt="Dashboard" className={iconClasses} />
    ),
    name: "Sheet",
  },
  // {
  //   path: "/app/visitor", // Changed from /register and added /app prefix
  //   icon: (
  //     <img src="/icons/visitor.svg" alt="Dashboard" className={iconClasses} />
  //   ),
  //   name: "Vistor",
  // },
  // {
  //   path: "/app/idmanagment",
  //   icon: <img src="/icons/ID.svg" alt="Dashboard" className={iconClasses} />,
  //   name: "ID Management",
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Settings", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/settings-profile", //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: "Profile", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/app/settings-billing",
  //       icon: <WalletIcon className={submenuIconClasses} />,
  //       name: "Billing",
  //     },
  //     {
  //       path: "/app/settings-team", // url
  //       icon: <UsersIcon className={submenuIconClasses} />, // icon component
  //       name: "Team Members", // name that appear in Sidebar
  //     },
  //   ],
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Documentation", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/getting-started", // url
  //       icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
  //       name: "Getting Started", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/app/features",
  //       icon: <TableCellsIcon className={submenuIconClasses} />,
  //       name: "Features",
  //     },
  //     {
  //       path: "/app/components",
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
  //       name: "Components",
  //     },
  //   ],
  // },
];

export default routes;
