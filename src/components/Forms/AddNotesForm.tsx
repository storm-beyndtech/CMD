import { useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import Btn from "../UI/Btn";

export default function AddNotesForm() {
  const [notes, setNotes] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle note submission logic here
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Textarea for notes */}
      <textarea
        value={notes}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Write notes here..."
        rows={6}
      ></textarea>

      {/* File upload section */}
      <div className="mb-4 border-2 border-dashed border-secondary3 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
        <input
          type="file"
          className="hidden"
          id={`file-input-1`}
          accept=".pdf,.jpg,.png"
          onChange={handleFileChange}
          multiple
        />
        <label
          htmlFor={`file-input-1`}
          className="bg-[#90BD401A] text-secondary3 font-semibold justify-center cursor-pointer flex items-center gap-2 p-3 rounded-xl mx-auto mb-4"
        >
          <CgSoftwareUpload /> Upload Supporting Document(s)
        </label>
        <p className="text-sm text-gray-500">
          Upload pdf, jpg, and png formats <br />
          <span className="text-xs">Max file size 50MB</span>
        </p>

        {/* File previews */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {selectedFiles.map((file, index) => {
            const fileURL = URL.createObjectURL(file);
            return (
              <div key={index} className="w-[80px] h-[80px]">
                <img
                  src={fileURL}
                  alt={`file-preview-${index}`}
                  className="object-cover w-full h-full rounded-md border border-gray-200"
                  style={{ maxWidth: "80px", maxHeight: "80px" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit button */}

      <a
        href="javascript:void(0)"
        className={`${notes.length > 5 ? "opacity-100" : "opacity-50"}`}
      >
        <Btn type="primary" label="Save" auth />
      </a>
    </form>
  );
}
