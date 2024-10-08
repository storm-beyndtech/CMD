import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import { IoMdAddCircle } from "react-icons/io";
import { sendRequest } from "../../utility/sendRequest";

export default function DocSpecialtyForm2({
  onSubmit,
  formValues,
  isLoading,
  error,
  setFormValues,
  handleChange
}: any) {
  const { identificationNumber } = formValues;

  const socials = [
    { placeholder: "LinkedIn Profile", id: "linkedin" },
    { placeholder: "Twitter Profile", id: "twitter" },
    { placeholder: "Personal Website", id: "website" },
  ];


  const handleFileChange = (e: any, title: string) => {
    const file = e.target.files[0];
    if (title === "Medical License (Front)") {
      handleDocUpload(file, "medicalLicenseFront");
    } else if (title === "Medical License (Back)") {
      handleDocUpload(file, "medicalLicenseBack");
    } else if (title === "Resume") { 
      handleDocUpload(file, "resume");
    }
  };

  
  const handleDocUpload = async (file: any, docTitle:string) => {
    if (!file) return alert("Invalid file selected");

    const formData = new FormData();
    formData.append("documentTitle", docTitle);
    formData.append("file", file);


    try {
      await sendRequest("/doctors/profile/upload", "POST", formData);
      alert(`${docTitle} updated successfully`);
    } catch (error: any) {
      console.error(error.message);
      alert(`Failed to upload ${docTitle}:  ${error.message}`);
    }
  };


  return (
    <form
      className="w-full sm:min-w-[500px] flex flex-col sm:px-8 px-4 mx-auto bg-white rounded-[14px]"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      {" "}
      {/* Identification Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Identification Number (SSN, EIN, ITIN, NIN)
        </label>
        <input
          type="text"
          value={identificationNumber}
          placeholder="SSN, EIN, ITIN, NIN"
          className="input"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              identificationNumber: e.target.value,
            })
          }
        />
      </div>
      {/* File Upload Section */}
      {["Medical License (Front)", "Medical License (Back)", "Resume"].map(
        (label, i) => (
          <div key={i} className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Upload {label}
            </label>
            <div className="border-2 border-dashed border-secondary3 rounded-lg p-6 text-center cursor-pointer bg-[#F9FAF7] hover:bg-gray-50">
              <input
                type="file"
                className="hidden"
                id={`file-input-${i}`}
                accept=".pdf,.jpg,.png"
                onChange={(e) => handleFileChange(e, label)}
              />
              <label
                htmlFor={`file-input-${i}`}
                className="text-secondary3 font-medium cursor-pointer flex items-center gap-2 border border-secondary3 p-3 w-fit rounded-xl mx-auto mb-4"
              >
                <IoMdAddCircle />{" "}
                Choose File
              </label>
              <p className="text-sm text-gray-500">
                Upload pdf, jpg, and png formats <br />
                <span className="text-xs">Max file size 50MB</span>
              </p>
            </div>
          </div>
        ),
      )}
      {/* Social Links (Optional) */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Social Links (Optional)
        </label>
        {socials.map(
          ({id, placeholder}, i) => (
            <input
              key={i}
              type="text"
              placeholder={placeholder}
              className="input mb-2"
              onChange={(e) =>
                handleChange(id, e.target.value)
              }
            />
          ),
        )}
      </div>
      {/* Error Message */}
      {error && <Alert type="danger" message={error} />}
      {/* Submit Button */}
      <div className="text-center my-3">
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
