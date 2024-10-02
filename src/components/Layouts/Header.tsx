import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import DropdownUser from "../UI/DropdownUser";
import Notification from "../Notification";
import { VscMenu } from "react-icons/vsc";

interface propData {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: propData) {
  console.log(sidebarOpen, setSidebarOpen);

  return (
    <header className="fixed top-0 left-0 z-[1000] flex w-full bg-white">
      <div className="flex flex-grow items-center justify-between py-4 px-8">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-auto h-12" />
        </Link>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <Notification />
          <DropdownUser />
          <VscMenu
            className="lg:hidden size-6 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      </div>
    </header>
  );
}
