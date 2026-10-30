// documents.ts — Document vault and OCR forensic API service.
import { apiClient } from './apiClient';
import { DocumentItem } from '@/types';

const BASE_URL =
  typeof window === 'undefined'
    ? (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000')
    : (process.env.NEXT_PUBLIC_API_URL || '');

export const documentsService = {
  getDocuments: async (caseId: string): Promise<DocumentItem[]> => {
    return apiClient<DocumentItem[]>(`/api/cases/${caseId}/documents`);
  },
  uploadDocument: async (file: File, caseId: string): Promise<DocumentItem> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseId', caseId);

    const response = await fetch(`${BASE_URL}/api/documents/upload`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }
};
