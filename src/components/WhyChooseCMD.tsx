import { Features } from "../types/types";

export default function WhyChooseCMD({ features }: { features: Features[] }) {
  return (
    <section className="max-ctn py-[75px]">
      <h2 className="title pb-10">Why Choose CMD?</h2>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-primary flex flex-col gap-6 py-9 px-7 rounded-[14px]"
          >
            <img src={feature.icon} alt={feature.title} width={42} height={42}/>
            <h2 className="text-[22px] font-semibold text-[#2B2F38] leading-[33px] max-w-[300px]">
              {feature.title}
            </h2>
            <p className="text-[17px] text-[#5D6679] leading-[25.5px]">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
