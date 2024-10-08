import badge from "../assets/icons/badge.svg";
import Avatar from "./UI/Avatar";

export default function AttendingDoctor({ doctor }: any) {
	return (
		<div className="p-[22px] rounded-[14px] bg-white">
			<h2 className="text-lg font-semibold text-[#383E49]">Attending Doctor</h2>

			<div className="flex items-center gap-4 py-5">
				<Avatar
					firstName={doctor.user?.firstName || "D"}
					profileImageUrl={doctor.user?.photo?.url || ""}
					height="110px"
          width="110px"
          borderRadius="10px"
				/>
				<div className="grid gap-1">
					<p className="font-semibold text-[#2B2F38]">
						{doctor.user?.firstName} {doctor.user?.lastName}
					</p>
					<p className="text-sm text-[#483380] font-medium">{doctor.primaryPracticeLocation.position}</p>
					<div className="flex items-start gap-1">
						<img src={badge} alt="badge" width={22.5} />
						<p className="text-[#5D6679] text-xs leading-5">{doctor.primaryPracticeLocation.hospital}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
