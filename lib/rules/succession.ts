export interface SuccessionRule {
  id: string;
  category: "Class_I" | "Class_II" | "Intestate" | "Nominee";
  relationship: string;
  eligibilityPriority: number;
  citation: string;
  verified: boolean;
  notes: string;
}

// TODO(legal): unverified — needs advocate review
export const SUCCESSION_RULES: SuccessionRule[] = [
  {
    id: "HSA-1956-SEC8-CLASS1-SON",
    category: "Class_I",
    relationship: "Son",
    eligibilityPriority: 1,
    citation: "Hindu Succession Act, 1956 - Section 8, Schedule Class I",
    verified: false, // TODO(legal): unverified — needs advocate review
    notes: "Shares equally in intestate property with other Class I legal heirs.",
  },
  {
    id: "HSA-1956-SEC8-CLASS1-DAUGHTER",
    category: "Class_I",
    relationship: "Daughter",
    eligibilityPriority: 1,
    citation: "Hindu Succession Act, 1956 - Section 8, Schedule Class I",
    verified: false, // TODO(legal): unverified — needs advocate review
    notes: "Equal coparcenary rights following 2005 Amendment.",
  },
  {
    id: "HSA-1956-SEC8-CLASS1-WIDOW",
    category: "Class_I",
    relationship: "Spouse",
    eligibilityPriority: 1,
    citation: "Hindu Succession Act, 1956 - Section 8, Schedule Class I",
    verified: false, // TODO(legal): unverified — needs advocate review
    notes: "Takes one share of the estate along with children.",
  },
  {
    id: "RBI-CLAIM-SETTLEMENT-DECEASED-2024",
    category: "Intestate",
    relationship: "Legal Heir",
    eligibilityPriority: 1,
    citation: "RBI Guidance on Claim Settlement in Deceased Accounts",
    verified: false, // TODO(legal): unverified — needs advocate review
    notes: "Requires Legal Heir Certificate / Indemnity Bond for accounts without active nomination.",
  },
];
