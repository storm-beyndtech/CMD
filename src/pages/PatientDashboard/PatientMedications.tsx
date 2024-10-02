import MiniMedsList from "../../components/MiniMedsList";
import TabPrescriptions from "../../components/TabPrescriptions";
import { dummyDrugList } from "../../lib/dashboardUtils";

export default function PatientMedications() {
  return (
    <div className="grid gap-10">
      <TabPrescriptions />
      <MiniMedsList drugs={dummyDrugList} medsPage/>
    </div>
  )
}
