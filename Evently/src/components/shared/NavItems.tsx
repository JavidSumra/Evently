"use client";

import { Link } from "react-router-dom";
// import { usePathname } from "next/navigation";

const NavItems = () => {
  const headerLinks = [
    {
      label: "Home",
      route: "/",
    },
    {
      label: "Create Event",
      route: "/events/create",
    },
    {
      label: "My Profile",
      route: "/profile",
    },
  ];
  //   const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        // const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${"text-primary-500"} flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link to={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
