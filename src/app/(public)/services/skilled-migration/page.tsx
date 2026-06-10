import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { servicesData } from "@/lib/services-data";

const service = servicesData["skilled-migration"];

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.seoDescription,
  alternates: { canonical: "/services/skilled-migration" },
};

export default function SkilledMigrationPage() {
  return <ServicePage service={service} />;
}
