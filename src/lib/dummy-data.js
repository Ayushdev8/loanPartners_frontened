export const partnerTypes = ["SCA",
    "PSB",
    "RRB",
    "NBFC_MFI"];



export const currentPartner = {
  id: 101,
  name: "Northbridge Health Trust",
  partnerType: "HOSPITAL",
  state: "Delhi",
  district: "South Delhi",
  address: "14 Aurobindo Marg, Hauz Khas, New Delhi",
  phone: "+91 98765 43210",
  email: "contact@northbridgetrust.org",
  website: "https://northbridgetrust.org",
  npaFlag: false,
  isVerified: true,
  createdAt: "2026-04-02",
};

export const schemes = [
  {
    id: 1,
    schemeId: "SCH-2026-014",
    currentLoad: "HIGH",
    avgTurnaroundDays: 9,
    updatedByName: "Anita Rao",
    updatedAt: "2026-08-29",
  },
  {
    id: 2,
    schemeId: "SCH-2026-011",
    currentLoad: "LOW",
    avgTurnaroundDays: 3,
    updatedByName: "Vikram Shah",
    updatedAt: "2026-08-27",
  },
  {
    id: 3,
    schemeId: "SCH-2026-009",
    currentLoad: "MEDIUM",
    avgTurnaroundDays: 6,
    updatedByName: "Anita Rao",
    updatedAt: "2026-08-25",
  },
  {
    id: 4,
    schemeId: "SCH-2025-098",
    currentLoad: "LOW",
    avgTurnaroundDays: 4,
    updatedByName: "Farah Khan",
    updatedAt: "2026-08-20",
  },
  {
    id: 5,
    schemeId: "SCH-2025-091",
    currentLoad: "MEDIUM",
    avgTurnaroundDays: 7,
    updatedByName: "Vikram Shah",
    updatedAt: "2026-08-14",
  },
];

export const admins = [
  { id: 1, username: "anita.rao", fullName: "Anita Rao", role: "PARTNER_ADMIN" },
  { id: 2, username: "vikram.shah", fullName: "Vikram Shah", role: "PARTNER_ADMIN" },
  { id: 3, username: "farah.khan", fullName: "Farah Khan", role: "SCHEME_MANAGER" },
];
