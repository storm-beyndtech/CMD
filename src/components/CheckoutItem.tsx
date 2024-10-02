interface CheckoutItemProps {
  image: string;
  name: string;
  dosage: string;
  price: number;
}

export function CheckoutItem({ image, name, dosage, price }: CheckoutItemProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-14 h-14 rounded" />
        <div>
          <h3 className="font-semibold text-[#344054]">{name}</h3>
          <p className="text-sm text-[#5D6679]">{dosage}</p>
        </div>
      </div>
      <span className="font-bold text-[#383E49]">${price.toFixed(2)}</span>
    </div>
  );
}
