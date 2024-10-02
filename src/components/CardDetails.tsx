import { useState } from "react";
import { GrClose } from "react-icons/gr";
import copyIcon from "../assets/icons/copy.svg";
import Btn from "./UI/Btn";

export default function CardDetails({
  cardDetails,
  isModalOpen,
  setIsModalOpen,
}: any) {
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [password, setPassword] = useState("");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const confirmPassword = (e: any) => {
    e.preventDefault();
    // Here, validate the password (for now, we'll assume it's always valid)
    setIsPasswordConfirmed(true);
  };

  return (
    isModalOpen && (
      <div className="h-screen fixed top-0 left-0 inset-0 z-[50000] bg-black bg-opacity-50 py-20 overflow-y-scroll">
        <div className="h-fit min-h-[850px] w-full">
          <div className="bg-white rounded-[14px] p-6 max-w-md w-full relative mx-auto">
            <GrClose
              className="absolute top-5 right-5 text-gray-500 text-2xl cursor-pointer"
              onClick={() => setIsModalOpen(false)} // Close Modal
            />
            <h2 className="text-xl text-[#383E49] font-semibold mb-4">
              {isPasswordConfirmed ? "Your Card Details" : "Confirm Password"}
            </h2>
            <div className="grid gap-4">
              {!isPasswordConfirmed ? (
                <form onSubmit={confirmPassword}>
                  <div className="grid gap-2">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div
                      className={`${
                        password.length > 6 ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <Btn label="Confirm Password" type="primary" auth />
                    </div>
                  </div>
                </form>
              ) : (
                <div className="grid gap-4">
                  {/* Cardholder Name */}
                  <div className="relative">
                    <span className="text-xs absolute top-1.5 left-4 text-[#858D9D]">
                      Name
                    </span>
                    <input
                      type="text"
                      className="input !pt-6"
                      value={cardDetails.cardholderName}
                      disabled
                    />
                    <a
                      href="#"
                      className="flex items-center gap-1 absolute right-3 top-5"
                      onClick={() => handleCopy(cardDetails.cardholderName)}
                    >
                      <span className="text-sm font-medium text-[#858D9D]">
                        Copy
                      </span>
                      <img src={copyIcon} alt="copy" />
                    </a>
                  </div>

                  {/* Card Number */}
                  <div className="relative">
                    <span className="text-xs absolute top-1.5 left-4 text-[#858D9D]">
                      Card Number
                    </span>
                    <input
                      type="text"
                      className="input !pt-6"
                      value={cardDetails.cardNumber}
                      disabled
                    />
                    <a
                      href="#"
                      className="flex items-center gap-1 absolute right-3 top-5"
                      onClick={() => handleCopy(cardDetails.cardNumber)}
                    >
                      <span className="text-sm font-medium text-[#858D9D]">
                        Copy
                      </span>
                      <img src={copyIcon} alt="copy" />
                    </a>
                  </div>

                  {/* Expiry Date */}
                  <div className="relative">
                    <span className="text-xs absolute top-1.5 left-4 text-[#858D9D]">
                      Expiry Date
                    </span>
                    <input
                      type="text"
                      className="input !pt-6"
                      value={cardDetails.expiryDate}
                      disabled
                    />
                    <a
                      href="#"
                      className="flex items-center gap-1 absolute right-3 top-5"
                      onClick={() => handleCopy(cardDetails.expiryDate)}
                    >
                      <span className="text-sm font-medium text-[#858D9D]">
                        Copy
                      </span>
                      <img src={copyIcon} alt="copy" />
                    </a>
                  </div>

                  {/* CVC */}
                  <div className="relative">
                    <span className="text-xs absolute top-1.5 left-4 text-[#858D9D]">
                      CVC
                    </span>
                    <input
                      type="text"
                      className="input !pt-6"
                      value={cardDetails.cvc}
                      disabled
                    />
                    <a
                      href="#"
                      className="flex items-center gap-1 absolute right-3 top-5"
                      onClick={() => handleCopy(cardDetails.cvc)}
                    >
                      <span className="text-sm font-medium text-[#858D9D]">
                        Copy
                      </span>
                      <img src={copyIcon} alt="copy" />
                    </a>
                  </div>

                  {/* billing information */}
                  <div className="grid gap-4 pt-5">
                    <h2 className="text-xl text-[#383E49] font-semibold">
                      Billing Address
                    </h2>

                    <div className="relative">
                      <span className="text-xs absolute top-1.5 left-4 text-[#858D9D]">
                        Country
                      </span>
                      <input
                        type="text"
                        className="input !pt-6"
                        value={cardDetails.billingAddress.country}
                        disabled
                      />
                      <a
                        href="#"
                        className="flex items-center gap-1 absolute right-3 top-5"
                        onClick={() =>
                          handleCopy(cardDetails.billingAddress.country)
                        }
                      >
                        <span className="text-sm font-medium text-[#858D9D]">
                          Copy
                        </span>
                        <img src={copyIcon} alt="copy" />
                      </a>
                    </div>

                    <div className="relative">
                      <span className="text-xs absolute top-1.5 left-4 text-[#858D9D]">
                        State
                      </span>
                      <input
                        type="text"
                        className="input !pt-6"
                        value={cardDetails.billingAddress.state}
                        disabled
                      />
                      <a
                        href="#"
                        className="flex items-center gap-1 absolute right-3 top-5"
                        onClick={() =>
                          handleCopy(cardDetails.billingAddress.state)
                        }
                      >
                        <span className="text-sm font-medium text-[#858D9D]">
                          Copy
                        </span>
                        <img src={copyIcon} alt="copy" />
                      </a>
                    </div>

                    <div className="relative">
                      <span className="text-xs absolute top-1.5 left-4 text-[#858D9D]">
                        Street Address
                      </span>
                      <input
                        type="text"
                        className="input !pt-6"
                        value={cardDetails.billingAddress.streetAddress}
                        disabled
                      />
                      <a
                        href="#"
                        className="flex items-center gap-1 absolute right-3 top-5"
                        onClick={() =>
                          handleCopy(cardDetails.billingAddress.streetAddress)
                        }
                      >
                        <span className="text-sm font-medium text-[#858D9D]">
                          Copy
                        </span>
                        <img src={copyIcon} alt="copy" />
                      </a>
                    </div>

                    <div className="relative">
                      <span className="text-xs absolute top-1.5 left-4 text-[#858D9D]">
                        Postal / Zip Code
                      </span>
                      <input
                        type="text"
                        className="input !pt-6"
                        value={cardDetails.billingAddress.zipCode}
                        disabled
                      />
                      <a
                        href="#"
                        className="flex items-center gap-1 absolute right-3 top-5"
                        onClick={() =>
                          handleCopy(cardDetails.billingAddress.zipCode)
                        }
                      >
                        <span className="text-sm font-medium text-[#858D9D]">
                          Copy
                        </span>
                        <img src={copyIcon} alt="copy" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
