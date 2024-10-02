import { useEffect, useState } from "react";
import upload from "../assets/icons/gallery-add.svg";
import flag from "../assets/icons/ng.svg";
import { contextData } from "../context/AuthContext";
import { sendRequest } from "../utility/sendRequest";
import Btn from "./UI/Btn";
import InputField from "./UI/InputField";

export default function PartnersProfile() {
  const { user, token, login } = contextData();
  const [formValues, setFormValues] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "johndoe@gmail.com",
    phoneNumber: user?.phoneNumber || "814 353 3456",
    gender: user?.gender || "Male",
    address: user?.address || "14 Oak Drive, Lekki Phase 1",
    city: user?.city || "Lekki",
    state: user?.state || "Lagos",
    country: user?.country || "Nigeria",
    zipCode: user?.zipCode || "105102",
  });

  const [avatarInitial, setAvatarInitial] = useState("J");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Set avatar based on the first letter of the user's first name
    if (user?.firstName) {
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
      const response = await fetch(
        "https://cmd-global-server-1df15d3c7a6c.herokuapp.com/api/profile/photo",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to upload profile picture.",
        );
      }


      const responseData = await response.json();

      // Pass both the token and user data to the login function
      login({ token, ...responseData });

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
      <div className="flex md:flex-col p-8 bg-white rounded-2xl">
        {/* Profile Photo */}
        <div className="flex items-center gap-10 mb-10 md:mr-8">
          <div className="w-full max-w-[200px]">
            <h3 className="font-semibold mb-4 text-[#2B2F38]">Profile photo</h3>
            <p className="text-sm mb-4 text-[#667185]">
              This image will be displayed on your profile
            </p>
            <input
              type="file"
              id="profileImage"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
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
              className="h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <span className="h-28 w-28 rounded-full grid place-content-center font-bold text-white text-5xl bg-[#204592]">
              {avatarInitial}
            </span>
          )}
        </div>

        {/* Personal Information */}
        <div className="w-full flex flex-col gap-4 rounded-lg p-6">
          <div>
            <h3 className="font-semibold mb-4 text-[#2B2F38]">
              Personal Information
            </h3>
            <p className="text-sm mb-6 text-[#667185]">
              Update your personal details here
            </p>
            {/* Save All Button */}
            {isEditing && (
              <a href="#" onClick={handleSaveAll}>
                <Btn type="primary" label="Save All" />
              </a>
            )}
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="firstName"
              label="First Name"
              value={formValues.firstName}
              onChange={handleInputChange}
              required
            />
            <InputField
              id="lastName"
              label="Last Name"
              value={formValues.lastName}
              onChange={handleInputChange}
              required
            />

            {/* Full-width email input */}
            <div className="col-span-2">
              <InputField
                id="email"
                label="Email"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Phone Number with custom design */}
            <div className="col-span-2">
              <label className="label">
                Phone Number
                <div className="w-full flex items-center relative">
                  <div className="h-full flex items-center gap-2 px-3 absolute left-0 top-0 z-[2]">
                    <img src={flag} alt="flag" className="w-6" />
                    <p className="text-[#383E49]">+234</p>
                  </div>
                  <input
                    value={formValues.phoneNumber}
                    onChange={handleInputChange}
                    type="tel"
                    className="input !pl-[90px] relative"
                    placeholder="814 353 3456"
                    required
                    id="phoneNumber"
                    maxLength={10}
                  />
                </div>
              </label>
            </div>

            <InputField
              id="gender"
              label="Gender"
              value={formValues.gender}
              onChange={handleInputChange}
              required
            />
          </form>
        </div>
      </div>
    </section>
  );
}
