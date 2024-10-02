import { Link } from "react-router-dom";
import { SecData } from "../types/types";
import Btn from "./UI/Btn";

export default function BasicSec({ secData }: { secData: SecData }) {
  return (
    <section className="max-ctn flex flex-col-reverse md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32 py-[100px]" id={secData.id}>
      <img
        className="max-w-[630px] w-full"
        src={secData.imgUrl}
        alt={secData.title}
      />

      <div className="w-full max-w-[586px] flex flex-col gap-9">
          <h2 className="title max-w-[500px] max-sm:max-w-72">{secData.title}</h2>
          <p className="desc">{secData.desc}</p>

        <Link to={secData.url}>
          <Btn type="primary" label={secData.btnLabel} />
        </Link>
      </div>
    </section>
  );
}
