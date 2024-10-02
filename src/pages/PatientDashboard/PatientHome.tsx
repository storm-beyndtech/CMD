import BookLabAppointment from "../../components/BookLabAppointment";
import ConsultationResults from "../../components/ConsultationResultsMini";
import GetCard2 from "../../components/GetCard2";
import HRANotification from "../../components/HRA/HRANotification";
import MiniMedsList from "../../components/MiniMedsList";
import { dummyDrugList } from "../../lib/dashboardUtils";

export default function PatientHome() {
  return (
    <div>
      <div className="grid gap-4 border-b border-gray-200 pb-6 mb-6">
        <HRANotification />
        <ConsultationResults />
        <BookLabAppointment />
      </div>

      <div className="grid gap-5">
        <GetCard2 />
        <MiniMedsList drugs={dummyDrugList.slice(0, 4)} />
      </div>
    </div>
  );
}
