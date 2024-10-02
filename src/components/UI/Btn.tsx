import { CgSpinner } from "react-icons/cg";
import play from "../../assets/icons/play-circle.svg";
import { FaArrowRight } from "react-icons/fa6";

type dataProp = {
  type: "primary" | "altOne" | "altTwo" | "altThree" | "small";
  label: string;
  disabled?: boolean;
  btnAction?: "button" | "submit" | "reset" | undefined;
  auth?: boolean;
  form?: boolean;
  icon?: boolean;
};

export default function Btn({
  type,
  label,
  disabled,
  btnAction,
  auth,
  form,
  icon,
}: dataProp) {
  switch (type) {
    case "primary":
      return (
        <button
          disabled={disabled}
          type={btnAction}
          className={`${
            auth || form ? "w-full" : ""
          } text-white bg-secondary hover:bg-secondary2 font-semibold rounded-xl text-[15px] px-[16.5px] py-[12.5px] text-center me-2 inline-flex items-center justify-center whitespace-nowrap ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {disabled ? (
            <CgSpinner className="w-4 h-4 text-white spin mr-2" />
          ) : (
            label
          )}
        </button>
      );

    case "small":
      return (
        <button
          disabled={disabled}
          type="button"
          className={`text-white whitespace-nowrap bg-secondary hover:bg-secondary2 font-semibold rounded-xl text-sm px-[18.5px] py-[11px] text-center me-2 inline-flex items-center ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }${form ? "w-full flex items-center justify-center gap-4" : ""}`}
        >
          {disabled ? (
            <CgSpinner className="w-4 h-4 text-white spin mr-2" />
          ) : (
            label
          )}
          {icon && <FaArrowRight />}
        </button>
      );

    case "altOne":
      return (
        <button
          disabled={disabled}
          type="button"
          className={`text-white whitespace-nowrap bg-secondary3 hover:bg-[#82ab3a] font-semibold rounded-xl text-[15px] px-[16.5px] py-[12.5px] text-center me-2 inline-flex items-center ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {disabled ? (
            <CgSpinner className="w-4 h-4 text-white spin mr-2" />
          ) : (
            label
          )}
        </button>
      );

    case "altTwo":
      return (
        <button
          disabled={disabled}
          type="button"
          className={`text-white whitespace-nowrap border border-[#808080] font-semibold rounded-xl text-[15px] px-[16.5px] py-[12.5px] inline-flex items-center gap-4`}
        >
          {label}
          <img src={play} alt="play button" />
        </button>
      );

    case "altThree":
      return (
        <button
          type="button"
          className={`text-secondary whitespace-nowrap border border-secondary font-semibold rounded-xl text-[15px] px-[16.5px] py-[12.5px]`}
        >
          {label}
        </button>
      );

    default:
      return;
  }
}
