import { Link } from "react-router-dom";
import DrugCard from "./DrugCard";

export default function MiniMedsList({
  medsPage,
  drugs,
}: {
  medsPage?: boolean;
    drugs: {
    id: string;
    name: string;
    imageUrl: string;
    strength: string;
  }[];
}) {
  return (
    <div className="p-6 rounded-[14px] bg-white">
      <div className="flex items-center justify-between">
        {!medsPage && (
          <h2 className="text-lg font-semibold text-[#383E49]">Medications</h2>
        )}
        {medsPage && (
          <div>
            <h2 className="text-xl font-semibold text-[#383E49] mb-1">
              Available Medications
            </h2>
            <p className="text-[#858D9D] mb-5">
              Get any of these delivered to you in three days or less
            </p>
          </div>
        )}

        {!medsPage && (
          <Link
            className="text-[15px] text-secondary font-medium"
            to="/dashboard/patient/medications"
          >
            See More
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-3 gap-y-8 justify-between items-start mt-5">
        {drugs.map(({ name, imageUrl, strength }, i) => (
          <DrugCard key={i} name={name} imgUrl={imageUrl} strength={strength} />
        ))}
      </div>
    </div>
  );
}
