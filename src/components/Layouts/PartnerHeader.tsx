import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Notification from "../Notification";
import { VscMenu } from "react-icons/vsc";
import PartnerDropdown from "../UI/PartnerDropdown";

interface propData {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}

export default function PartnerHeader({
  sidebarOpen,
  setSidebarOpen,
}: propData) {

  return (
    <header className="fixed top-0 left-0 z-[1000] flex w-full bg-white">
      <div className="flex flex-grow items-center justify-between py-4 px-8">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-auto h-12" />
        </Link>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <Notification />
          <PartnerDropdown />
          <VscMenu
            className="lg:hidden size-6 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      </div>
    </header>
  );
}
