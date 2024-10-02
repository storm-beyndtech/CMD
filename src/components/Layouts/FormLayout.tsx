import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Alert from "../UI/Alert";

export default function FormLayout({
  children,
  activeTab,
  setActiveTab,
  page,
  error,
}: {
  children: React.ReactNode;
  activeTab: string | undefined;
  setActiveTab: (tab: string) => void;
  page: string;
  error: string | null;
}) {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/auth/${page}/${tab}`);
  };

  return (
    <div className="w-full md:w-[70%] flex flex-col gap-8 pt-10 pb-10 px-5 shadow-sm max-sm:pt-5 items-center z-50 bg-primary">
      {/* Header */}
      <Link to="/">
        <img className="w-[150px]" alt="logo" src={logo} />
      </Link>

      <div className="w-full max-w-[542px] bg-white rounded-[14px] flex flex-col pb-10 shadow-lg shadow-[#eaeaeaa6]">
        {/* Tabs */}
        <div className="w-full h-[66px] flex mb-10">
          <button
            className={`authTab ${
              activeTab === "register"
                ? "!text-secondary3 border-secondary3"
                : "!font-normal"
            }`}
            onClick={() => handleTabChange("register")}
          >
            Register
          </button>

          <button
            className={`authTab ${
              activeTab === "login"
                ? "!text-secondary3 border-secondary3"
                : "!font-normal"
            }`}
            onClick={() => handleTabChange("login")}
          >
            Sign In
          </button>
        </div>

        {children}

        {error && (
          <div className="px-8 max-sm:px-5">
            <Alert type="danger" message={error} />
          </div>
        )}
      </div>

      <footer className="text-center text-sm text-[#858D9D] mt-5">
        © CMD Health Systems - Privacy & terms
      </footer>
    </div>
  );
}
