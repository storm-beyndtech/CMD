import { Link, useNavigate } from "react-router-dom";
import Avatar from "./UI/Avatar";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import CalendarModal from "./CalendarModal";

export default function LabAppointmentCard({ data }: any) {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isCalendarVisible, setIsCalendarVisible] = useState(false);

	const toggleCalendarVisibility = () => {
		setIsCalendarVisible(!isCalendarVisible);
	};

	const handleOpenCalendar = () => {
		setIsCalendarVisible(true);
	};

	const handleNavigate = () => {
		navigate(`/dashboard/partner/lab/appointment/${data.id}`);
	};

	return (
		<>
			<div className="border border-gray-100 p-4 rounded-[14px] relative">
				<div className="flex items-start gap-5 cursor-pointer" onClick={handleNavigate}>
					<Avatar
						firstName={data.patientDetails?.name || "J"}
						profileImageUrl={data.patientDetails?.photo?.url || ""}
						height="75px"
						width="75px"
						borderRadius="50%"
					/>

					<div className="grid">
						<p className="sm:text-lg font-semibold text-[#2B2F38]">{data.patientDetails?.name}</p>
						<p className="text-sm text-[#9ea1a7] mt-1">Booked, {data.date}</p>
					</div>
				</div>

				{/* Right: Menu Icon (Desktop Only) */}
				<div className="absolute right-3 top-4 hidden md:block">
					<FiMoreHorizontal
						className="cursor-pointer text-[#667085]"
						size={24}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					/>
					{isMenuOpen && (
						<div className="absolute right-0 mt-2 w-fit text-nowrap bg-white border rounded-lg shadow-lg px-4 py-2">
							<Link
								to="#"
								className="hover:bg-gray-100 cursor-pointer text-sm text-secondary flex items-center gap-3"
								onClick={handleOpenCalendar}
							>
								View on your Calendar <BsArrowRight />
							</Link>
						</div>
					)}
				</div>

				<div className="grid mt-5">
					<p className="text-sm text-[#5D6679] mt-2.5">{data.notes}</p>
				</div>
			</div>

			{/* show calendar */}
			<CalendarModal
				highlightDate={data.date}
				isVisible={isCalendarVisible}
				onClose={toggleCalendarVisibility}
			/>
		</>
	);
}
