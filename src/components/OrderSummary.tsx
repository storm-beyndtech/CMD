import { Prescription } from '../types/types';
import { CheckoutItem } from './CheckoutItem'; // Update with correct path

interface OrderSummaryProps {
  items: Prescription[];
  fees: number;
}

export function OrderSummary({ items, fees }: OrderSummaryProps) {
  const total = items.reduce((acc, item) => acc + item.drug.price, fees);

  return (
    <div className="flex-shrink-0 w-full h-fit lg:max-w-[386px] bg-white rounded-[14px] py-9 px-6 shadow-lg shadow-[#eaeaeaa6]">
      <h3 className="text-[18px] font-semibold leading-[21.6px] text-[#2B2F38] mb-5">Your Order</h3>

      {/* List of checkout items */}
      {items.map((item, index) => (
        <CheckoutItem
          key={index}
          image={item.drug.imageUrl}
          name={item.drug.name}
          dosage={item.dosage}
          price={item.drug.price}
        />
      ))}

      {/* Fees */}
      <div className="py-8 grid gap-5 border-y border-[#F0F0F0]">
        <p className="font-medium text-[#48505E] flex justify-between">
          <span>Estimated fees & VAT</span>
          <span>${fees.toFixed(2)}</span>
        </p>
      </div>

      {/* Total */}
      <h2 className="flex justify-between mt-5">
        <span className="font-medium text-[#383E49]">Total</span>
        <span className="font-bold text-[#383E49]">${total.toFixed(2)}</span>
      </h2>
    </div>
  );
}
