import { useState, useEffect } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { contextData } from "../../context/AuthContext";
import menu from "../../assets/icons/menu.svg";
import { CgClose } from "react-icons/cg";
import Btn from "../UI/Btn";

export interface MenuGroup {
  name: string;
  href: string;
}

const list = [
  { name: "Home", href: "#" },
  { name: "Solutions", href: "#solutions" },
  { name: "Membership", href: "#membership" },
  { name: "FAQs", href: "#faqs" },
];

function MenuList({ items }: { items: MenuGroup[] }) {
  const handleNavbg = () => {
    const nav = document.getElementById("navBar");
    if (nav) {
      if (window.scrollY >= 150) {
        nav.style.backgroundColor = "#fffffff0";
        nav.style.position = "fixed";
      } else {
        nav.style.backgroundColor = "#ffffff";
        nav.style.position = "static";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavbg);
  }, []);

  return (
    <div
      className={`flex items-center justify-center max-lg:flex-col max-lg:mt-20 gap-6`}
    >
      {items.map((listItem, i) => (
        <a
          href={listItem.href}
          key={i}
          className="inline-flex items-center gap-x-1 font-normal leading-6 text-[#48505E] max-lg:text-xl"
        >
          <span>{listItem.name}</span>
        </a>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = contextData();
  console.log(user);

  return (
    <header
      className="static w-full top-0 left-0 z-40 bg-white backdrop-blur-2xl"
      id="navBar"
    >
      <nav className="max-ctn flex items-center justify-between py-6 gap-20 max-sm:gap-0">
        <div className="w-full flex items-center gap-8 max-md:justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 border-r border-gray-300"
          >
            <img
              className="h-[47px] max-sm:h-[33.57px] w-auto pr-8"
              src={logo}
              alt="logo"
            />
          </Link>

          {/* Desktop Menu */}
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <MenuList items={list} />
          </PopoverGroup>
        </div>

        {user ? (
          <div className="hidden lg:flex justify-end items-center gap-6">
            <Link
              to={
                user.accountType !== "member" && user.partnerType
                  ? `/dashboard/partner/${user.partnerType}`
                  : user.accountType !== "member" && !user.partnerType
                  ? `/dashboard/partner/doctor`
                  : user.accountType === "member"
                  ? "/dashboard/patient"
                  : "/"
              }
            >
              <Btn type="small" label="Dashboard" />{" "}
            </Link>
          </div>
        ) : (
          <div className="flex justify-end items-center gap-6">
            <Link
              to="/auth/partner/register"
              className="font-medium text-secondary max-md:hidden whitespace-nowrap"
            >
              Join as a Partner
            </Link>

            <Link
              to="/auth/patient/login"
              className="text-sm font-medium leading-6 text-gray-100 w-fit"
            >
              <Btn type="primary" label="Log in" />
            </Link>
          </div>
        )}
        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <img src={menu} alt="menu" className="w-14" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        as="div"
        className="lg:hidden fixed inset-0 z-[999] bg-black bg-opacity-50"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <DialogPanel
          className={`fixed flex flex-col gap-5 inset-y-0 right-0 z-[1000] w-[300px] overflow-y-auto px-6 py-6 sm:max-w-sm bg-white
             ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <button
              className="-m-2.5 rounded-md p-2.5 text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <CgClose className="h-10 w-10" aria-hidden="true" />
            </button>
          </div>

          <MenuList items={list} />

          {user ? (
            <div className="flex flex-1 justify-center items-center max-lg:items-start gap-6">
              <Link
                to={
                  user.accountType !== "member" && user.partnerType
                    ? `/dashboard/partner/${user.partnerType}`
                    : user.accountType !== "member" && !user.partnerType
                    ? `/dashboard/partner/doctor`
                    : user.accountType === "member"
                    ? "/dashboard/patient"
                    : "/"
                }
              >
                <Btn type="small" label="Dashboard" />
              </Link>
            </div>
          ) : (
            <Link
              to="/auth/partner/register"
              className="font-medium text-lg text-center text-secondary lg:flex lg:justify-end lg:items-center lg:gap-6"
            >
              Join as a Partner
            </Link>
          )}
        </DialogPanel>
      </Dialog>
    </header>
  );
}
