// import Footer from "../components/Footer";
import BasicSec from "../components/BasicSec";
import Benefits from "../components/Benefits";
import ConditionsWeTreat from "../components/ConditionsWeTreat";
import Faq from "../components/Faq";
import HealthExperts from "../components/HealthExperts";
import Hero from "../components/Hero";
import HowCmdWorks from "../components/HowCmdWorks";
import JoinCmdSec from "../components/JoinCmdSec";
import Footer from "../components/Layouts/Footer";
import Navbar from "../components/Layouts/Navbar";
import Sponsors from "../components/Sponsors";
import Testimonials from "../components/Testimonials";
import WhyChooseCMD from "../components/WhyChooseCMD";
import { features, theElite } from "../lib/utils";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BasicSec secData={theElite} />
      <WhyChooseCMD features={features} />
      <ConditionsWeTreat />
      <HealthExperts />
      <Benefits />
      <HowCmdWorks />
      <Testimonials />
      <Faq />
      <Sponsors />
      <JoinCmdSec />
      <Footer />
    </>
  );
}
