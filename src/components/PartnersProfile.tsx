import { useEffect, useState } from "react";
import upload from "../assets/icons/gallery-add.svg";
import { contextData } from "../context/AuthContext";
import { sendRequest } from "../utility/sendRequest";
import Btn from "./UI/Btn";
import InputField from "./UI/InputField";
import dayjs from "dayjs";

export default function PartnersProfile() {
	const { user, token, fetchUser, profile } = contextData();
	const [phone, setPhone] = useState("");
	const [avatarInitial, setAvatarInitial] = useState("J");
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		// Set avatar based on the first letter of the user's first name
		if (user?.firstName) {
			setAvatarInitial(user.firstName.charAt(0).toUpperCase());
		}

		setPhone(user.phone);
	}, [user]);

	const handleImageChange = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			handleProfilePictureUpload(file);
		}
	};

	const handleProfilePictureUpload = async (file: any) => {
		if (!file) return alert("Invalid file selected");

		const formData = new FormData();
		formData.append("file", file);
		try {
			await sendRequest("/profile/photo", "POST", formData);
			await fetchUser(token);
			alert("Profile picture updated successfully!");
		} catch (error: any) {
			console.error("Failed to upload profile picture:", error.message);
		}
	};

	const handleSaveAll = async () => {
		const reqData = {};
		try {
			await sendRequest("/profile/update", "PUT", reqData);
			alert("Profile updated successfully!");
			setIsEditing(false); // Hide the Save All button
		} catch (error: any) {
			console.error("Failed to update profile:", error.message);
		}
	};

	const handleInputChange = (e: any) => {
		setPhone(e.target.value);
		setIsEditing(true);
	};

	return (
		<section>
			<h2 className="font-bold text-xl py-5">Profile</h2>
			<div className="flex flex-col max-sm:gap-10 sm:p-8 p-5 py-8 bg-white rounded-2xl">
				{/* Profile Photo */}
				<div className="flex max-sm:flex-row-reverse sm:items-center sm:gap-10 gap-4 mb-10 md:mr-8">
					<div className="w-full sm:max-w-[200px]">
						<h3 className="font-semibold mb-4 text-[#2B2F38]">Profile photo</h3>
						<p className="text-sm mb-4 text-[#667185]">This image will be displayed on your profile</p>
						<input type="file" id="profileImage" onChange={handleImageChange} style={{ display: "none" }} />
						<label
							htmlFor="profileImage"
							className="text-secondary3 border border-secondary3 font-semibold rounded-xl text-[15px] px-[16.5px] py-[12.5px] inline-flex items-center gap-4 cursor-pointer"
						>
							<img src={upload} alt="upload" />
							Change Photo
						</label>
					</div>

					{/* Conditionally render either the user's profile picture or the avatar */}
					{user?.photo?.url ? (
						<img
							src={user.photo.url}
							alt="Profile"
							className="sm:h-28 w-16 sm:w-28 h-16 rounded-full object-cover"
						/>
					) : (
						<span className="h-28 w-28 rounded-full grid place-content-center font-bold text-white text-5xl bg-[#204592]">
							{avatarInitial}
						</span>
					)}
				</div>

				{/* Personal Information */}
				<div className="w-full flex max-sm:flex-col max-lg:flex-wrap justify-between gap-6 rounded-[14px]">
					<div className="flex-shrink-0 sm:max-w-44">
						<h3 className="font-semibold mb-3 text-[#2B2F38] text-sm">Personal Information</h3>
						<p className="text-xs mb-6 text-[#667185]">Update your personal details here</p>
						{/* Save All Button */}
						{isEditing && (
							<a href="#" onClick={handleSaveAll}>
								<Btn type="primary" label="Update Profile" />
							</a>
						)}
					</div>

					<form className="md:grid md:grid-cols-2 gap-6 max-sm:flex max-sm:flex-col">
						<InputField type="primary" label="First Name" placeholder={user?.firstName} disabled />

						<InputField type="primary" label="Last Name" placeholder={user?.lastName} disabled />

						{/* Full-width email input */}
						<div className="col-span-2">
							<InputField type="primary" label="Email" placeholder={user?.email} disabled />
						</div>

						<InputField type="phone" label="Phone Number" value={phone} onChange={handleInputChange} />
						<InputField type="primary" label="Gender" placeholder={user?.gender} disabled />
					</form>
				</div>

				{/* Personal Information */}
				<div className="w-full flex max-sm:flex-col max-lg:flex-wrap justify-start gap-6 rounded-[14px] mt-16">
					<div className="flex-shrink-0 sm:max-w-44">
						<h3 className="font-semibold mb-3 text-[#2B2F38] text-sm">Professional Information</h3>
						<p className="text-xs mb-6 text-[#667185]">
							Reach out to us to update any of your professional info
						</p>
					</div>

					<div className="w-full flex flex-col gap-7">
						<div>
							<h3 className="font-medium mb-3 text-[#2B2F38] text-sm">Specialities</h3>
							<div className="flex gap-3 flex-wrap">
								{profile.specialities.map((spc: string, i: number) => (
									<div
										key={i}
										className="bg-gray-100 rounded-xl px-3 py-2 text-sm text-[#3b3d42] 
                  font-semibold grid place-content-center"
									>
										{spc}
									</div>
								))}
							</div>
						</div>

						<div className="w-full">
							<h3 className="font-medium mb-3 text-[#2B2F38] text-sm">Primary Practice Location</h3>
							<div className="flex flex-col p-4 w-full bg-gray-100 rounded-xl">
								<h3 className="text-sm text-[#3b3d42]  font-semibold mb-2">
									{profile.primaryPracticeLocation.hospital}
								</h3>
								<p className="text-xs text-[#667185]">
									{profile.primaryPracticeLocation.position} . Since{" "}
									{dayjs(profile.primaryPracticeLocation.startDate).format("MMM , YYYY")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
