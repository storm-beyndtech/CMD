import { DoctorsNotesProps } from "../types/types";

export default function DoctorsNotes({
  notes,
  documents,
  isDoctor,
}: DoctorsNotesProps) {
  return (
    <div className="p-[22px] rounded-[14px] bg-white">
      {isDoctor && (
        <h2 className="text-lg font-semibold text-[#383E49]">Doctor's Notes</h2>
      )}
      <p className="text-sm text-[#5D6679] mt-2.5">{notes}</p>
      <div className="flex mt-5 gap-4">
        {documents.map((doc, i) => (
          <img
            key={i}
            src={doc}
            alt="Document"
            className="w-[125px] h-[125px] rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  );
}
