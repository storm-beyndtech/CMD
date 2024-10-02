import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import upgradeImg from "../../assets/upgrade.svg";
import { navItems } from "../../lib/dashboardUtils";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface SidelinkProps {
  to: string;
  label: string;
  icons: { default: string; active: string };
  isActive: boolean;
}

const SidebarLink = ({ to, label, icons, isActive }: SidelinkProps) => (
  <NavLink
    to={to}
    className={`group relative flex items-center gap-3.5 border-b border-[#F2F2F2] py-6 font-medium ${
      isActive ? "text-secondary3" : "text-[#383E49]"
    }`}
  >
    <img
      src={isActive ? icons.active : icons.default}
      alt={label}
      className="text-xl"
    />
    {label}
  </NavLink>
);

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { pathname } = useLocation();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const handleOutsideClick = ({ target }: MouseEvent) => {
    if (
      !sidebar.current ||
      !trigger.current ||
      sidebar.current.contains(target) ||
      trigger.current.contains(target)
    )
      return;
    setSidebarOpen(false);
  };

  const handleEscKeyPress = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === 27) setSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscKeyPress);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [sidebarOpen]);

  // Define a function to check if a path is active
  const checkIsActive = (path: string) => pathname === path;

  return (
    <div
      className={`${
        sidebarOpen
          ? "w-screen h-screen bg-black/20 z-[6000] fixed top-0 left-0 cursor-pointer"
          : ""
      }`}
      onClick={() => setSidebarOpen(false)}
    >
      <aside
        ref={sidebar}
        className={`fixed right-0 top-0 z-[5000] flex h-[100vh] sm:h-[80vh] sm:max-h-[650px] w-[300px] flex-col lg:mt-[110px] px-6 pb-3 rounded-2xl overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full no-scrollbar flex flex-col justify-between overflow-y-auto">
          <nav className="py-4">
            <ul className="flex flex-col">
              {navItems.map(({ to, label, icons }) => (
                <SidebarLink
                  key={to}
                  to={to}
                  label={label}
                  icons={icons}
                  isActive={checkIsActive(to)}
                />
              ))}
            </ul>
          </nav>

          <div className="flex gap-2 items-center">
            <img src={upgradeImg} alt="upgrade" />
            <div className="grid gap-1">
              <Link
                to="/dashboard/patient"
                className="text-[#483380] font-semibold flex gap-3 items-center"
              >
                Upgrade your Plan <FaArrowRight />
              </Link>
              <p className="text-xs text-[#5D6679]">
                Want more? Get Gold to cover you and loved ones
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
