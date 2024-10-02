import Btn from "./UI/Btn";
import { Link } from "react-router-dom";
import cardImg from "../assets/payment-options/virtual-cards.svg";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import card from "../assets/Card.svg";
import CardDetails from "./CardDetails";

const cardInfo = {
  cardholderName: "Soroush Nasrpour",
  cardNumber: "6037 9975 9598 3090",
  expiryDate: "11/25",
  cvc: "767",
  balance: 250,
  status: "active",
  billingAddress: {
    country: "Nigeria",
    state: "Lagos",
    streetAddress: "2, Oak Drive, Lekki Phase 1, Lekki",
    zipCode: "105102",
  },
};

export default function GetCard2() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(setIsAvailable);

  return (
    <div>
      {isAvailable ? (
        <div className="flex flex-wrap gap-8 items-center bg-white p-6 rounded-[14px]">
          <div className="flex flex-col gap-3 place-content-center">
            <img src={card} alt="card" className="max-sm:w-full"/>
            <Link
              to="#"
              className="flex text-sm items-center gap-3 hover:gap-4 text-secondary font-semibold underline"
            >
              What can I do with my card?
            </Link>
          </div>
          <div className="grid pt-1">
            <p className="text-lg font-bold text-[#48505E] flex items-center gap-4 mb-2">
              Gold Family Plan{" "}
              <span
                className={`px-3 py-[2px] text-sm font-medium rounded-[100px] ${
                  cardInfo.status === "pending"
                    ? "bg-[#F7900914]-100 text-[#F79009]"
                    : "bg-[#12B76A14] text-[#12B76A]"
                }`}
              >
                {cardInfo.status}
              </span>
            </p>

            <p className="text-[#5D6679] mb-10">
              <span className="text-secondary3 font-semibold">
                ${cardInfo.balance}
              </span>{" "}
              CareCredits available
            </p>

            <div onClick={() => setIsModalOpen(true)}>
              <Btn label="View Card Details" type="altThree" />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-[14px] flex flex-wrap-reverse justify-between items-center gap-2">
          <img src={cardImg} alt="CarePoints Card" className="w-[210px]" />

          <div className="w-full max-w-[490px] flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-[#383E49]">
              Get your Carepoints Card
            </h2>
            <p className="text-[#5D6679] leading-[25.5px] w-full mb-1">
              {" "}
              Our card is packed with exclusive benefits designed for those who
              expect nothing but the best in personalized healthcare
            </p>

            <div className="flex gap-3">
              <Btn label="Get Card" type="small" />
              <Link
                to="#"
                className="flex items-center gap-3 hover:gap-4 text-secondary font-semibold"
              >
                See Benefits <BsArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <CardDetails
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cardDetails={cardInfo}
        />
      )}
    </div>
  );
}
