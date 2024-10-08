import { useEffect, useState } from "react";
import { contextData } from "../../context/AuthContext";
import upload from "../../assets/icons/gallery-add.svg";
import InputField from "../../components/UI/InputField";
import { sendRequest } from "../../utility/sendRequest";
import Btn from "../../components/UI/Btn";

export default function PatientProfile() {
	const { user, fetchUser, profile, token } = contextData();
	const [formValues, setFormValues] = useState({
		firstName: profile?.firstName || "John",
		lastName: profile?.lastName || "Doe",
		email: profile?.email || "johndoe@gmail.com",
		phoneNumber: profile?.phoneNumber || "814 353 3456",
		gender: profile?.gender || "Male",
		address: profile?.address || "14 Oak Drive, Lekki Phase 1",
		city: profile?.city || "Lekki",
		state: profile?.state || "Lagos",
		country: profile?.country || "Nigeria",
		zipCode: profile?.zipCode || "105102",
	});

	const [avatarInitial, setAvatarInitial] = useState("J");
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (profile?.firstName) {
			setAvatarInitial(user.firstName.charAt(0).toUpperCase());
		}
	}, [user]);

	const handleInputChange = (e: any) => {
		const { id, value } = e.target;
		setFormValues((prev) => ({
			...prev,
			[id]: value,
		}));
		setIsEditing(true);
	};

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
		try {
			await sendRequest("/profile/update", "PUT", formValues);
			alert("Profile updated successfully!");
			setIsEditing(false); // Hide the Save All button
		} catch (error: any) {
			console.error("Failed to update profile:", error.message);
		}
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
						<InputField type="primary" label="First Name" placeholder={formValues.firstName} disabled />

						<InputField type="primary" label="Last Name" placeholder={formValues.lastName} disabled />

						{/* Full-width email input */}
						<div className="col-span-2">
							<InputField type="primary" label="Email" placeholder={formValues.email} disabled />
						</div>

						<InputField type="phone" label="Phone Number" value={formValues.phoneNumber} />
						<InputField type="primary" label="Gender" placeholder={formValues.gender} disabled />

						<div className="col-span-2">
							<InputField
								id="address"
								label="Address"
								value={formValues.address}
								onChange={handleInputChange}
							/>
						</div>

						<InputField
							id="city"
							label="City"
							value={formValues.city}
							onChange={handleInputChange}
							required
						/>
						<InputField
							id="state"
							label="State"
							value={formValues.state}
							onChange={handleInputChange}
							required
						/>

						<div className="col-span-2">
							<InputField
								id="country"
								label="Country"
								value={formValues.country}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="col-span-2">
							<InputField
								id="zipCode"
								label="Zip Code"
								value={formValues.zipCode}
								onChange={handleInputChange}
								required
							/>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
