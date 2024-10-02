import { conditionsList } from "../lib/utils";

export default function ConditionsWeTreat() {
  return (
    <section className="max-ctn py-[75px]">
      <div className="flex flex-col gap-4 mb-10">
        <h2 className="title">Conditions We Treat</h2>
        <p className="desc max-w-[550px] max-sm:max-w-80">
          We provide expert care for a diverse range of medical conditions, from
          common ailments to complex diseases
        </p>
      </div>

      <div className="w-full overflow-x-auto">
      <div className="sm:w-full w-[1000px] grid grid-cols-4 max-sm:flex flex-wrap p-4 bg-[#F8F8F8] rounded-[14px]">
      {conditionsList.map((condition, index) => (
        <div
          key={index}
          className={`max-sm:w-[20%] font-medium max-sm:text-sm text-center py-7 px-2 ${index % 4 !== 0 ? 'border-l' : ''} ${
            index >= 4 ? 'border-t' : ''
          } border-[#EBEBEB]`}
        >
          {condition}
        </div>
      ))}
    </div>

      </div>
    </section>
  );
}
