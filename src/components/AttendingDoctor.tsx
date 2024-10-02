import badge from "../assets/icons/badge.svg";
import { experts } from "../lib/utils";

export default function AttendingDoctor() {
  return (
    <div className="p-[22px] rounded-[14px] bg-white">
      <h2 className="text-lg font-semibold text-[#383E49]">Attending Doctor</h2>

      <div className="flex items-center gap-4 py-5">
        <img
          src={experts[3].img}
          alt={experts[3].name}
          className="w-[110px] h-[110px] rounded-[10px] object-cover"
        />
        <div className="grid gap-1">
          <p className="font-semibold text-[#2B2F38]">{experts[3].name}</p>
          <p className="text-sm text-[#483380] font-medium">
            {experts[3].position}
          </p>
          <div className="flex items-start gap-1">
            <img src={badge} alt="badge" width={22.5} />
            <p className="text-[#5D6679] text-xs leading-5">
              {experts[3].hospitals}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
