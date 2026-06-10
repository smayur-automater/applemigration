import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { servicesData } from "@/lib/services-data";

const service = servicesData["education-consulting"];

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.seoDescription,
  alternates: { canonical: "/services/education-consulting" },
};

export default function EducationConsultingPage() {
  return <ServicePage service={service} />;
}
