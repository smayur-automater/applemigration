import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { servicesData } from "@/lib/services-data";

const service = servicesData["german-opportunity-card"];

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.seoDescription,
  alternates: { canonical: "/services/german-opportunity-card" },
};

export default function GermanOpportunityCardPage() {
  return <ServicePage service={service} />;
}
