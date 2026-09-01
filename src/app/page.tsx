import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Process } from "@/components/home/Process";
import { Deliverables } from "@/components/home/Deliverables";
import { AudienceSplit } from "@/components/home/AudienceSplit";
import { ModelSection } from "@/components/home/ModelSection";
import { FaqPreview } from "@/components/home/FaqPreview";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Process />
      <Deliverables />
      <AudienceSplit />
      <ModelSection />
      <FaqPreview />
      <ClosingCta />
    </>
  );
}
