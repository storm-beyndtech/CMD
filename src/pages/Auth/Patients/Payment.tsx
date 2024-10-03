import { useState } from "react";
import logo from "../../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { paymentMethods } from "../../../lib/utils";
import PaymentForm from "../../../components/Forms/PaymentForm";
import { handleInputChange } from "../../../utility/handleInput";

export default function Payment() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    nameOnCard: "",
    cardNumber: "",
    cardExpiration: "",
    cvc: "",
    terms: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    handleInputChange(e, setFormValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    navigate("/payment-message?type=package")
  };

  return (
    <div className="w-full min-h-screen bg-primary pb-10 px-5">
      <Link to="/">
        <img className="w-[150px] mx-auto pt-5 !max-sm:pb-0" alt="logo" src={logo} />
      </Link>

      <div className="w-full grid place-content-center">
        <h2 className="title sm:!text-[22px] !text-xl text-center my-8">
          Subscribe to our Family Plan
        </h2>

        <div className="flex gap-5 max-lg:flex-col-reverse">
          <div className="flex-shrink-0 w-full max-w-[542px] bg-white rounded-[14px] py-8 px-8 shadow-lg shadow-[#eaeaeaa6]">
            <div className="w-full flex justify-between gap-2 pb-4">
              {paymentMethods.map((meth, i) => (
                <Link
                  to={meth.url}
                  key={i}
                  className="w-1/3 border border-[#f0f0f0] p-2.5 rounded-lg grid gap-1"
                >
                  <img src={meth.img} alt={meth.name} />
                  <p className="font-medium text-[#383E49] text-sm">
                    {meth.name}
                  </p>
                </Link>
              ))}
            </div>

            <div className="flex items-center py-6">
              <span className="block w-[44%] h-[1px] bg-[#f2f2f2]"></span>
              <span className="block bg-white text-[#48505E] px-2">OR</span>
              <span className="block w-[44%] h-[1px] bg-[#f2f2f2]"></span>
            </div>

            <PaymentForm
              onSubmit={handleSubmit}
              handleChange={handleChange}
              formValues={formValues}
              isLoading={loading}
              error={error}
              page="payment"
            />
          </div>

          <div className="flex-shrink-0 w-full h-fit lg:max-w-[386px] bg-white rounded-[14px] py-9 px-6 shadow-lg shadow-[#eaeaeaa6]">
            <h3 className="text-[18px] font-semibold leading-[21.6px] text-[#2B2F38] mb-5">
              Your Order
            </h3>

            <div className="py-8 grid gap-5 border-y border-[#F0F0F0]">
              <p className="font-medium text-[#48505E] flex justify-between">
                <span>Plan</span>
                <span>$1000.00</span>
              </p>
              <p className="font-medium text-[#48505E] flex justify-between">
                <span>Estimated fees & VAT</span>
                <span>$0.00</span>
              </p>
            </div>

            <h2 className="flex justify-between mt-5">
              <span className="font-medium text-[#383E49] ">Total</span>
              <span className="font-bold text-[#383E49] ">$1000.00</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
