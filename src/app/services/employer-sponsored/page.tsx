import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { servicesData } from "@/lib/services-data";

const service = servicesData["employer-sponsored"];

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.seoDescription,
  alternates: { canonical: "/services/employer-sponsored" },
};

export default function EmployerSponsoredPage() {
  return <ServicePage service={service} />;
}
