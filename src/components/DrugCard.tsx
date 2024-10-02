import { Link } from "react-router-dom";

interface DrugCardProps {
  name?: string;
  strength?: string;
  imgUrl?: string;
}

export default function DrugCard({ name, strength, imgUrl }: DrugCardProps) {
  return (
    <div key={name} className="w-fit max-[440px]:w-full flex-shrink-0">
      <img
        src={imgUrl}
        alt={name}
        className="sm:w-[150px] lg:w-[170px] rounded-[10px] mb-3 max-[440px]:w-full"
      />
      <p className="font-semibold text-[#383E49]">
        {name} {strength}
      </p>
      <Link to="#" className="text-[#989FAD] text-sm font-medium">
        Get Started →
      </Link>
    </div>
  );
}
