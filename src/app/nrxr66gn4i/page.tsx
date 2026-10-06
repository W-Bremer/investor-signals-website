import type { Metadata } from "next";
import { PACKAGES_METADATA } from "@/components/packages/PackagesView";
import { FoundersCircleView } from "@/components/packages/FoundersCircleView";

export const metadata: Metadata = { ...PACKAGES_METADATA, title: "Founder's Circle" };

export default function FoundersCirclePage() {
  return <FoundersCircleView />;
}
