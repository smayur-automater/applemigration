export const site = {
  name: "Apple Education & Immigration",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://applemigration.com.au",
  marn: "0000000",
  phone: "+61 2 9000 0000",
  phoneHref: "tel:+61290000000",
  email: "info@applemigration.com.au",
  emailHref: "mailto:info@applemigration.com.au",
  address: "Suite 12, Level 4, 100 George Street, Sydney NSW 2000",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=100+George+Street+Sydney+NSW+2000",
  hours: [
    { days: "Monday – Friday", time: "9:00am – 5:30pm AEST" },
    { days: "Saturday – Sunday", time: "Closed" },
  ],
  social: {
    linkedIn: "https://www.linkedin.com/company/apple-education-immigration",
    facebook: "https://www.facebook.com/appleeducationimmigration",
    instagram: "https://www.instagram.com/appleeducationimmigration",
  },
} as const;

export const maraDisclaimerText =
  "Migration advice provided is general in nature and does not constitute personal migration advice. Seek professional advice for your individual circumstances.";

export const maraRegistrationLine = `${site.name} | MARN ${site.marn} | Registered Migration Agent`;
