import Btn from "./UI/Btn";
import JoindCMD from "../assets/joinBg.jpg";
import { Link } from "react-router-dom";

export default function JoinCmdSec() {
  return (
    <section
      className="w-full sm:h-[600px] h-[500px] bg-cover bg-center grid place-content-center"
      style={{
        backgroundImage: `url(${JoindCMD})`,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="flex flex-col items-center gap-7 text-center">
        <h1 className="title !text-white">Join CMD Global Today</h1>
        <p className="desc !text-[#D0D3D9] max-sm:px-2">
          Start experiencing personalized healthcare with CMD Rx Global.
          <br className="max-sm:hidden" /> Enjoy exclusive access to world-class
          medications, doctors, and facilities while taking control of your
          health with ease.
        </p>
        <div className="flex items-center sm:gap-3 flex-wrap justify-center gap-y-3">
          <Link to="/auth/patient/register">
            <Btn type="altOne" label="Become a Member" />
          </Link>
          
          <Btn type="altTwo" label="Watch Video" />
        </div>
      </div>
    </section>
  );
}
