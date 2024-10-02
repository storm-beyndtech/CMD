import Btn from "./UI/Btn";
import verified from "../assets/icons/verified.svg";
import errorImg from "../assets/icons/error.svg";

export interface AlertProps {
  success?: boolean;
  title: string;
  desc: string;
  error?: string;
  btnAction: () => void;
  icon?: boolean;
  btnLabel: string;
}

export default function CardAlert({ title, desc, btnAction, icon, btnLabel, error, success }: AlertProps) {
  return (
    <div className="w-full max-w-[500px] text-center flex flex-col gap-4 items-center rounded-xl p-10 bg-white">
      {(icon && error) && <img src={errorImg} alt="icon" className="w-20" />}
      {(icon && success) && <img src={verified} alt="icon" className="w-20"/>}
      <h2 className="text-2xl font-semibold text-[#383E49]">{title}</h2>
      <p className="text-[#5D6679] leading-[25.5px]">{desc}</p>

      <div onClick={btnAction} className="w-full flex">
        <Btn label={btnLabel} type="primary" form icon/>
      </div>
    </div>
  );
}
