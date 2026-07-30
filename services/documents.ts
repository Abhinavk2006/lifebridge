// documents.ts — Document vault and OCR forensic API service.
import { apiClient } from './apiClient';
import { DocumentItem } from '@/types';

export const documentsService = {
  getDocuments: async (caseId: string): Promise<DocumentItem[]> => {
    return apiClient<DocumentItem[]>(`/api/cases/${caseId}/documents`);
  },
  uploadDocument: async (file: File, caseId: string): Promise<DocumentItem> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseId', caseId);

    const response = await fetch('http://localhost:8000/api/documents/upload', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }
};
