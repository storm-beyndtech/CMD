import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormLayout from "../../../components/Layouts/FormLayout";
import family from "../../../assets/auth/family.svg";
import AuthForm from "../../../components/Forms/AuthForm";
import { contextData } from "../../../context/AuthContext";
import { handleInputChange } from "../../../utility/handleInput";
import { sendRequest } from "../../../utility/sendRequest";
import {
  validateLoginFields,
  validateRegisterFields,
} from "../../../utility/validators";

export default function PatientAuth() {
  const navigate = useNavigate();
  const { action } = useParams<{ action: string }>();
  const [activeTab, setActiveTab] = useState(action);
  const [formValues, setFormValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    terms: false,
    stayLoggedIn: false,
  });
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { login } = contextData();

  useEffect(() => {
    setActiveTab(action);
  }, [action]);

  const handleChange = (e: any) => {
    handleInputChange(e, setFormValues);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let reqData: any = {};
    let isValid: string | boolean = false;

    if (activeTab === "register") {
      reqData = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phoneNumber: "+234" + formValues.phoneNumber,
        password: formValues.password,
        accountType: "member",
      };

      isValid = validateRegisterFields({
        ...reqData,
        confirmPassword: formValues.confirmPassword,
        terms: formValues.terms,
      });
    } else if (activeTab === "login") {
      reqData = {
        email: formValues.email,
        password: formValues.password,
      };

      isValid = validateLoginFields(reqData);
    }

    if (isValid !== true) return setError(isValid);

    try {
      setLoading(true);
      const response = await sendRequest(`/auth/${activeTab}`, "POST", reqData);

      login(response.data);

      if (activeTab === "register") {
        navigate("/verify-email");
      } else if (activeTab === "login") {
        if (response.data.user.accountType === "partner") {
          navigate("/dashboard/partner/doctor");
        } else {
          navigate("/dashboard/patient")
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-primary">
      {/* Left: Full-height Image */}
      <div className="hidden md:flex justify-start w-[40%]">
        <img
          src={family}
          alt="auth"
          className="w-auto h-screen fixed top-0 left-0"
        />
      </div>

      {/* Right: Form Content */}
      <FormLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        page="patient"
        error={error}
      >
        <AuthForm
          formValues={formValues}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={loading}
          authType={activeTab}
        />
      </FormLayout>
    </div>
  );
}
