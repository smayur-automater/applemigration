export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const serviceLinks: NavItem[] = [
  { label: "Student Visas", href: "/services/student-visas" },
  { label: "Skilled Migration", href: "/services/skilled-migration" },
  { label: "Partner & Family Visas", href: "/services/partner-family-visas" },
  { label: "Employer Sponsored", href: "/services/employer-sponsored" },
  { label: "Education Consulting", href: "/services/education-consulting" },
  { label: "New Zealand Visas", href: "/services/new-zealand-visas" },
  { label: "German Opportunity Card", href: "/services/german-opportunity-card" },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Discover Us", href: "/about", children: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
  ]},
  { label: "Immigration", href: "/services", children: serviceLinks },
  { label: "Student Services", href: "/services/education-consulting" },
  { label: "Testimonials", href: "/success-stories" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav = {
  services: serviceLinks,
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "MARA Disclosure", href: "/mara-disclosure" },
  ],
};
