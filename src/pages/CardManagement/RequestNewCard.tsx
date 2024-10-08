import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import RequestNewCardForm from "../../components/Forms/RequestNewCardForm";

export default function RequestNewCard() {

  return (
    <div className="w-full h-screen bg-primary">
      <Link to="/">
        <img className="w-[150px] mx-auto mt-5" alt="logo" src={logo} />
      </Link>
      <h2 className="text-lg font-semibold text-center my-7 mx-auto">Confirm your Details for Delivery</h2>

      <div className="w-full h-[80%] grid place-content-center">
        <RequestNewCardForm />
      </div>
    </div>
  );
}
