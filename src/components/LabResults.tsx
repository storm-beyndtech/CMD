import { LabResultsProps } from "../types/types";
import bloodDrop from "../assets/test/drop.svg";
import genotype from "../assets/test/genotype.svg";
import ruler from "../assets/test/ruler.svg";
import danger from "../assets/test/danger.svg";

export default function LabResults({
  lastVisit,
  remarks,
  tests,
  uploads,
}: LabResultsProps) {
  return (
    <div className="p-[22px] rounded-[14px] bg-white">
      <h2 className="text-lg font-semibold text-[#383E49]">Lab Results</h2>
      <p className="text-sm text-[#9a9ea6]">Last Visit, {lastVisit}</p>

      <div className="mt-6 grid gap-2">
        <h2 className="font-semibold text-[#383E49]">Remarks</h2>
        <p className="text-sm text-[#5D6679]">{remarks}</p>
      </div>

      {/* Test Results */}
      <div className="mt-10">
        <h2 className="font-semibold text-[#383E49] mb-2">Tests</h2>
        <div className="flex flex-wrap justify-between gap-2">
          <div className="min-w-[160px] border border-[#EBEBEB] px-3 py-2 rounded-[14px]">
            <div className="flex items-center gap-2 text-[#667085]">
              <p>Blood Group</p>
              <img src={bloodDrop} alt="blood group" />
            </div>
            <p className="font-semibold text-lg text-[#383E49] mt-1">
              {tests.bloodGroup}
            </p>
          </div>
          
          <div className="min-w-[160px] border border-[#EBEBEB] px-3 py-2 rounded-[14px]">
            <div className="flex items-center gap-2 text-[#667085]">
              <p>Genotype</p>
              <img src={genotype} alt="genotype" />
            </div>
            <p className="font-semibold text-lg text-[#383E49] mt-1">
              {tests.genotype}
            </p>
          </div>

          <div className="min-w-[160px] border border-[#EBEBEB] px-3 py-2 rounded-[14px]">
            <div className="flex items-center gap-2 text-[#667085]">
              <p>Height / Weight</p>
              <img src={ruler} alt="Height / Weight" />
            </div>
            <p className="font-semibold text-lg text-[#383E49] mt-1">
              {tests.height} / {tests.weight}
            </p>
          </div>

          <div className="min-w-[160px] border border-[#EBEBEB] px-3 py-2 rounded-[14px]">
            <div className="flex items-center gap-2 text-[#667085]">
              <p>Allergy</p>
              <img src={danger} alt="allergy" />
            </div>
            <p className="font-semibold text-lg text-[#383E49] mt-1">
              {tests.allergy}
            </p>
          </div>
        </div>
      </div>

      {/* Uploads */}
      <div className="mt-6">
        <h2 className="font-semibold text-[#383E49] mb-5">Uploads</h2>
        <div className="flex mt-4 gap-4">
          {uploads.map((doc, i) => (
            <img
              key={i}
              src={doc}
              alt="Document"
              className="w-[125px] h-[125px] rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
