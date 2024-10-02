import { Transaction } from "../types/types"; // Import the types
import searchIcon from "../assets/icons/search-normal.svg";
import filterIcon from "../assets/icons/filter.svg";

interface CardTransactionProps {
  transactions: Transaction[];
  // onSelectTransaction: (transaction: Transaction) => void;
}

export default function CardTransactions({
  transactions,
}: CardTransactionProps) {
  return (
    <div className="p-[22px] rounded-[14px] bg-white">
      <h2 className="text-lg font-semibold text-[#383E49]">Transactions</h2>
      <p className="text-sm text-gray-500 mb-4">
        You have made {transactions.length} transactions within the past year
      </p>

      {/* Search & Filter */}
      <div className="flex items-center justify-between gap-5 my-10">
        <div className="w-3/4 max-w-[380px] relative">
          <img
            src={searchIcon}
            alt="search"
            className="absolute left-3 top-4"
          />
          <input
            type="text"
            placeholder="Search Transactions, Types, Status, Date"
            className="!pl-10 input"
          />
        </div>

        <div className="p-3 flex-shrink-0 grid place-content-center border border-[#E0E0E0] rounded-xl">
          <img src={filterIcon} alt="filter" />
        </div>
      </div>

      {/* Transactions Table */}
      <table className="w-full">
        <thead className="max-sm:hidden">
          <tr className="text-left font-semibold py-5 text-[#2B2F38]">
            <th>Date</th>
            <th>Merchant / Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="cursor-pointer hover:bg-gray-100/20 max-sm:flex max-sm:flex-col max-sm:mb-10 max-sm:gap-2"
            >
              <td className="sm:py-5 text-[#48505E]">{transaction.date}</td>
              <td className="sm:py-5 text-[#48505E]">{transaction.desc}</td>
              <td className="sm:py-5 text-[#48505E]">{transaction.amount}</td>
              <td className="sm:py-5">
                <span
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-[100px] ${
                    transaction.status === "Completed"
                      ? "bg-[#12B76A14] text-[#12B76A]"
                      : transaction.status === "Refunded"
                      ? "bg-[#3850F014] text-[#3850F0]"
                      : "bg-[#F7900914] text-[#F79009]"
                  }`}
                >
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
