import stage2 from "../assets/onboarding/stage2.svg";
import stage2Mobile from "../assets/onboarding/stage2-mobile.svg";
import stage3 from "../assets/onboarding/stage3.svg";
import stage3Mobile from "../assets/onboarding/stage3-mobile.svg";

export default function OnboardingProgress({ stage }: { stage: string }) {
  return (
    <div className="w-fit mx-auto pt-14 pb-6">
      {stage === "2" ? (
        <>
          <img src={stage2} alt="stage-2" className="hidden sm:block" />
          <img src={stage2Mobile} alt="stage-2" className="sm:hidden" />
        </>
      ) : stage === "3" ? (
        <>
          <img src={stage3} alt="stage-3" className="hidden sm:block" />
          <img src={stage3Mobile} alt="stage-3" className="sm:hidden" />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
