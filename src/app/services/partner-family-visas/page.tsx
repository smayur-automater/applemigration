import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { servicesData } from "@/lib/services-data";

const service = servicesData["partner-family-visas"];

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.seoDescription,
  alternates: { canonical: "/services/partner-family-visas" },
};

export default function PartnerFamilyVisasPage() {
  return <ServicePage service={service} />;
}
