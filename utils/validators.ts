// validators.ts — Zod validation schemas with plain language error messages for all forms.
import { z } from 'zod';

export const newCaseSchema = z.object({
  deceasedName: z.string().min(2, { message: 'Enter the full legal name of the deceased' }),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Select a valid date of birth' }),
  dateOfDeath: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Select a valid date of death' }),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, { message: 'Enter valid 10-character PAN (e.g. ABCDE1234F)' }),
  aadhaar: z.string().optional(),
  jurisdiction: z.string().min(2, { message: 'Select state and High Court / Civil Court jurisdiction' }),
  executorName: z.string().min(2, { message: 'Enter the name of the appointed executor, administrator, or legal heir' })
});

export type NewCaseFormData = z.infer<typeof newCaseSchema>;

export const documentUploadSchema = z.object({
  caseId: z.string().min(1, { message: 'Select an active estate case' }),
  category: z.enum(['Identity', 'Legal', 'Financial', 'Tax', 'Property', 'Court'], { message: 'Select a document category' })
});

export type DocumentUploadFormData = z.infer<typeof documentUploadSchema>;

