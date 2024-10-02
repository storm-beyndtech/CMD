import { sponsors, sponsorsHero } from "../lib/utils";

export default function Sponsors() {
  return (
    <>
      <div className="max-ctn hidden items-center justify-around py-[75px] sm:flex">
        {sponsors.map((sponsor, i) => (
          <img
            key={i}
            src={sponsor.src}
            alt="partners"
            className="max-sm:w-[18%]"
          />
        ))}
      </div>

      <div className="max-ctn flex items-center justify-around py-[75px] sm:hidden">
        {sponsorsHero.map((sponsor, i) => (
          <img
            key={i}
            src={sponsor.src}
            alt="partners"
            className="max-sm:w-[18%]"
          />
        ))}
      </div>
    </>
  );
}
