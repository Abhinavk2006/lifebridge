// institutions.ts — Organizations directory and negotiation claims API service.
import { apiClient } from './apiClient';
import { Institution } from '@/types';

export const institutionsService = {
  getInstitutions: async (caseId: string): Promise<Institution[]> => {
    return apiClient<Institution[]>(`/api/cases/${caseId}/institutions`);
  },
  approveFeeWaiver: async (instId: string): Promise<{ status: string; message: string }> => {
    return apiClient<{ status: string; message: string }>(`/api/institutions/${instId}/waive-fee`, {
      method: 'POST'
    });
  }
};
