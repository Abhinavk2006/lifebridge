// cases.ts — Estate cases API service methods.
import { apiClient } from './apiClient';
import { EstateCase, DAGNode } from '@/types';

export const casesService = {
  getCases: async (): Promise<EstateCase[]> => {
    return apiClient<EstateCase[]>('/api/cases');
  },
  getCaseById: async (id: string): Promise<EstateCase> => {
    return apiClient<EstateCase>(`/api/cases/${id}`);
  },
  getDAGNodes: async (caseId: string): Promise<DAGNode[]> => {
    return apiClient<DAGNode[]>(`/api/cases/${caseId}/dag`);
  }
};
