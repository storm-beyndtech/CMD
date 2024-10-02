import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";

export default function DocAccSetupForm({
  onSubmit,
  formValues,
  isLoading,
  error,
  setFormValues,
}: any) {
  const { primaryPracticeLocation } = formValues;

  // Local state to manage achievements as an array of objects with note and file
  const [achievements, setAchievements] = useState<
    { note: string; file: File | null }[]
  >([]);
  const [newAchievement, setNewAchievement] = useState<{
    note: string;
    file: File | null;
  }>({
    note: "",
    file: null,
  });

  // Function to add a new achievement to the local state
  const addAchievement = () => {
    if (newAchievement.note.trim() && newAchievement.file) {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement({ note: "", file: null }); // Reset the inputs
    }
  };

  // Function to remove an achievement
  // const removeAchievement = (index: number) => {
  //   const updatedAchievements = achievements.filter((_, i) => i !== index);
  //   setAchievements(updatedAchievements);
  // };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewAchievement({ ...newAchievement, file });
  };

  return (
    <form
      className="w-full sm:min-w-[500px] flex flex-col sm:px-8 px-4 mx-auto bg-white rounded-[14px]"
      onSubmit={onSubmit}
    >
      {/* Hospital Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Hospital Name
        </label>
        <input
          type="text"
          value={primaryPracticeLocation?.hospital || ""}
          placeholder="Enter Hospital Name"
          className="input focus:"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              primaryPracticeLocation: {
                ...primaryPracticeLocation,
                hospital: e.target.value,
              },
            })
          }
        />
      </div>

      {/* Position Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Position
        </label>
        <input
          type="text"
          value={primaryPracticeLocation?.position || ""}
          placeholder="Enter Position"
          className="input focus:"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              primaryPracticeLocation: {
                ...primaryPracticeLocation,
                position: e.target.value,
              },
            })
          }
        />
      </div>

      {/* Start Date Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Start Date
        </label>
        <input
          type="text"
          placeholder="2024-01-06"
          value={primaryPracticeLocation?.startDate || ""}
          className="input"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              primaryPracticeLocation: {
                ...primaryPracticeLocation,
                startDate: e.target.value,
              },
            })
          }
        />
      </div>

      {/* Achievements Input */}
      <div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Achievements (Optional)
          </label>

          {/* Note Input */}
          <input
            type="text"
            className="input mb-2"
            placeholder="Enter Achievement Note"
            value={newAchievement.note}
            onChange={(e) =>
              setNewAchievement({ ...newAchievement, note: e.target.value })
            }
          />

          {/* File Input */}
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Upload Supporting Documents
          </label>
          <div className="border-2 border-dashed border-secondary3 rounded-lg p-6 text-center cursor-pointer bg-[#F9FAF7] hover:bg-gray-50">
            <input
              type="file"
              className="hidden"
              id={`file-input-1`}
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
            />
            <label
              htmlFor={`file-input-1`}
              className="text-secondary3 font-medium cursor-pointer flex items-center gap-2 border border-secondary3 p-3 w-fit rounded-xl mx-auto mb-4"
            >
              <IoMdAddCircle /> Choose File
            </label>
            <p className="text-sm text-gray-500">
              Upload pdf, jpg, and png formats <br />
              <span className="text-xs">Max file size 50MB</span>
            </p>
          </div>

          {/* Add Achievement Button */}
          <button
            type="button"
            className="formAdd mt-4"
            onClick={addAchievement}
          >
            <span className="font-bold text-lg">+</span> Add Achievement
          </button>
        </div>

        {/* Display Achievements List */}
        {/* <ul className="list-disc pl-5">
          {achievements.map((achievement, index) => (
            <li key={index} className="mb-2 flex justify-between">
              <span>
                {achievement.note}{" "}
                {achievement.file && `(${achievement.file.name})`}
              </span>
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeAchievement(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul> */}
      </div>

      {/* Error Message */}
      {error && <Alert type="danger" message={error} />}

      {/* Submit Button */}
      <div className="text-center my-8">
        <Btn
          label="Submit"
          type="primary"
          disabled={isLoading}
          btnAction="submit"
          auth
        />
      </div>
    </form>
  );
}
