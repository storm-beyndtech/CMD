import card from "../assets/Card.svg";
import GetCard2 from "./GetCard2";
import Btn from "./UI/Btn";

interface PlatformCardProps {
  setShowPaymentForm: any;
}

const cardInfo = {
  cardNumber: "6037 9975 9598 3090",
  cardholderName: "Soroush Nasrpour",
  balance: 250,
  status: "active",
};

export function PlatformCard({ setShowPaymentForm }: PlatformCardProps) {
  const cardAvailable = true;

  return (
    <div className="w-[666px] h-fit bg-white rounded-[14px] py-8 px-8 shadow-lg shadow-[#eaeaeaa6]">
      {/* If card is available, render card info */}
      {cardAvailable ? (
        <div className="grid gap-10">
          <div className="flex gap-8 items-center">
            <img src={card} alt="card" />
            <div className="grid gap-2">
              <p className="text-lg font-bold text-[#48505E] flex items-center gap-4">
                Gold Family Plan{" "}
                <span
                  className={`px-3 py-[2px] text-sm font-semibold rounded-[100px] ${
                    cardInfo.status === "pending"
                      ? "bg-[#F7900914]-100 text-[#F79009]"
                      : "bg-[#12B76A14] text-[#12B76A]"
                  }`}
                >
                  {cardInfo.status}
                </span>
              </p>

              <p className="text-[#5D6679] mb-4">
                <span className="text-secondary3 font-semibold">
                  ${cardInfo.balance}
                </span>{" "}
                CareCredits available
              </p>

              <div>
                <Btn label="Proceed with Card" type="primary" />
              </div>
            </div>
          </div>

          <a
            href="#"
            className="text-secondary font-medium"
            onClick={() => setShowPaymentForm(true)}
          >
            Use different Card or Payment Method {""}→
          </a>
        </div>
      ) : (
        // If no card is available, render "Get New Card" section
        <GetCard2 />
      )}
    </div>
  );
}
