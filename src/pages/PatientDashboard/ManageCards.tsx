import CardTransactions from "../../components/CardTransactions";
import GetCard2 from "../../components/GetCard2";
import { transactions } from "../../lib/dashboardUtils";

export default function ManageCards() {
  return (
    <div className="grid gap-10 mb-10">
      <GetCard2 />
      <CardTransactions transactions={transactions} />
    </div>
  );
}
