import stage1 from "../assets/onboarding/doc-stage-1.svg";
import stage2 from "../assets/onboarding/doc-stage-2.svg";

export default function OnboardingProgressDoc({ stage }: { stage: string }) {
  return (
    <div className="w-fit mx-auto pt-14 pb-6">
      {stage === "1" ? (
        <>
          <img src={stage1} alt="stage-1" />
        </>
      ) : stage === "2" ? (
        <>
          <img src={stage2} alt="stage-2" />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
