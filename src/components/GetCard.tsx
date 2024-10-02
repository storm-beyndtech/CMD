// Card.tsx
import { Link } from "react-router-dom";
import cardImage from "../assets/payment-options/virtual-cards.svg";

export default function GetCard() {
  return (
    <div className="bg-white p-6 rounded-[14px] mt-10 flex flex-wrap-reverse justify-between items-center gap-10">
      <img src={cardImage} alt="CarePoints Card" className="" />

      <div className="w-full max-w-[656px] flex flex-col gap-3.5">
        <h3 className="text-lg font-semibold leading-[22.5px] text-secondary3">
          Become a Member, Get a Card
        </h3>
        <h3 className="text-[22px] font-semibold leading-[30.8px] text-[#2B2F38]">
          CarePoints Card Virtual Clinic Consultations & Quality Rx Supplies
        </h3>

        <ul className="text-left list-disc ml-6 leading-6">
          <li>
            <strong>Direct-Pay-Practice Model</strong>: Consultations, including
            direct Canadian-approved drugs prescribed by a Nigerian
            board-certified physician. Medications are shipped securely to a
            Personal Medical Record (PHR) system overseen by a pharmacist
          </li>
          <li>
            <Link to="#" className="text-secondary underline mt-2 block">
              See conditions this covers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
