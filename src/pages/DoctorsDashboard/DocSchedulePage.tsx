import DocExemptions from "../../components/DocExemptions";
import DocScheduleDays from "../../components/DocScheduleDays";
import DocWorkingHours from "../../components/DocWorkingHours";
import { consultations, dummySchedule } from "../../lib/dashboardUtils";

const DocSchedulePage: React.FC = () => {

  return (
    <div className="space-y-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <p className="text-sm text-[#9ea1a7] my-1.5">
          You have consulted {consultations.length} times within the past year
        </p>

      </div>
      <DocScheduleDays daysWithInfo={dummySchedule.days} />
      <DocWorkingHours initialAvailability={dummySchedule.availability} />
      <DocExemptions exemptions={dummySchedule.exemptions} />
    </div>
  );
};

export default DocSchedulePage;
