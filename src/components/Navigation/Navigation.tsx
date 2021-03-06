import { NavLink, useLocation } from "react-router-dom";
import AddIcon from "../Icons/AddIcon";
import HomeIcon from "../Icons/HomeIcon";
import MapIcon from "../Icons/MapIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import UserIcon from "../Icons/UserIcon";

interface Navlink {
  link: string;
  text: string;
  icon: JSX.Element;
}

const Navigation = (): JSX.Element => {
  const { pathname } = useLocation();
  const navlinks: Navlink[] = [
    {
      link: "/home",
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      link: "/galeries",
      text: "Galleries map",
      icon: <MapIcon />,
    },
    {
      link: "/add-post",
      text: "Add Post",
      icon: <AddIcon />,
    },
    {
      link: "/my-profile",
      text: "My Profile",
      icon: <UserIcon color="" />,
    },
    {
      link: "/settings",
      text: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <div className="flex relative items-center justify-center">
      <div className="flex flex-col">
        <div className="fixed bottom-0 left-0 right-0 px-5 pt-0 bg-violet-500 opacity-90 shadow-lg rounded-2xl w-screen">
          <ul className="flex flex-row space-x-3 justify-evenly">
            {navlinks.map((navlink) => (
              <li key={navlink.text} className="flex group">
                <NavLink
                  to={navlink.link}
                  className={`p-3 ${
                    pathname === navlink.link ? "text-cyan-400" : "text-white"
                  } hover:text-cyan-400`}
                >
                  <span className="flex flex-col items-center">
                    {navlink.icon}

                    <span className="text-xs mb-2 transition-all duration-200">
                      {navlink.text}
                    </span>

                    <span className="h-2 w-2 rounded-full group-hover:bg-cyan transition-all duration-150 delay-100"></span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
