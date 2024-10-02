import { useState } from "react";
import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import { IoMdAddCircle } from "react-icons/io";

export default function DocSpecialtyForm2({
  onSubmit,
  formValues,
  isLoading,
  error,
  setFormValues,
}: any) {
  const { identificationNumber } = formValues;
  const [selectedFiles, setSelectedFiles] = useState<Array<string | null>>([
    null,
    null,
    null,
  ]);

  const handleFileChange = (e: any, index: number) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFiles = [...selectedFiles];
      updatedFiles[index] = file.name; // Save the file name in state
      setSelectedFiles(updatedFiles);
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
                onChange={(e) => handleFileChange(e, i)}
              />
              <label
                htmlFor={`file-input-${i}`}
                className="text-secondary3 font-medium cursor-pointer flex items-center gap-2 border border-secondary3 p-3 w-fit rounded-xl mx-auto mb-4"
              >
                <IoMdAddCircle />{" "}
                {selectedFiles[i] ? selectedFiles[i] : "Choose Files"}
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
        {["LinkedIn Profile", "Twitter Profile", "Personal Website"].map(
          (placeholder, i) => (
            <input
              key={i}
              type="text"
              placeholder={placeholder}
              className="input mb-2"
            />
          ),
        )}
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
