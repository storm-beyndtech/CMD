import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi"; // Menu icon
import { MdContentCopy } from "react-icons/md"; // Copy icon
import notificationIcon from "../../assets/icons/notification-2.svg";
import googleMeetIcon from "../../assets/icons/google-meet.svg";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Consultation } from "../../types/types";
import CalendarModal from "../CalendarModal";

export default function HRANotification({ consultation }: { consultation: Consultation | null }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isCalendarVisible, setIsCalendarVisible] = useState(false);
	dayjs.extend(advancedFormat);

	const toggleCalendarVisibility = () => {
		setIsCalendarVisible(!isCalendarVisible);
	};

	const handleOpenCalendar = () => {
		setIsCalendarVisible(true);
	};

	return (
		<>
			<div className="p-6 rounded-[14px] bg-white w-full">
				{/* Top Section */}
				<div className="flex justify-between items-start">
					{/* Left: Icon and Title */}
					<div className="flex items-start sm:gap-4 gap-2">
						<img src={notificationIcon} alt="notification icon" className="text-[#383E49] max-sm:w-5" />
						<div className="flex flex-col gap-3">
							<h2 className="text-lg font-semibold text-[#383E49]">HRA Appointment</h2>
							<button className="mt-2 border border-[#f0f0f0] text-[#48505E] text-sm py-3 px-4 rounded-lg flex items-center gap-2">
								<img src={googleMeetIcon} alt="Google Meet" className="w-5 h-5" />
								Join with Google Meet
							</button>
							<div className="flex items-center gap-2 mt-1 text-[#667085] text-sm">
								<MdContentCopy className="cursor-pointer" />
								<a href="https://meet.google.com/edr-ghj-yti" className="hover:underline">
									meet.google.com/edr-ghj-yti
								</a>
							</div>
						</div>
					</div>

					{/* Right: Menu Icon (Desktop Only) */}
					<div className="relative hidden md:block">
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
									View on your Calendar
									<BsArrowRight />
								</Link>
							</div>
						)}
					</div>
				</div>

				{/* Bottom Section */}
				<div className="mt-4 border-t pt-4 text-[#383E49] text-sm flex flex-wrap gap-5 items-center justify-between">
					<p>
						{!consultation && "7pm, Thursday, September 11, 2024"}
						{consultation && dayjs(consultation.dateTime).format("h A, dddd, MMMM D, YYYY")}
					</p>
					<p>West Africa Time</p>
					<p>{consultation && consultation.doctor.primaryPracticeLocation.hospital}</p>
				</div>
			</div>

			{/* show calendar */}
			<CalendarModal
				highlightDate={consultation?.dateTime}
				isVisible={isCalendarVisible}
				onClose={toggleCalendarVisibility}
			/>
		</>
	);
}
