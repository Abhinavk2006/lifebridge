import { apiClient } from './apiClient';
import { CredentialDeactivationItem } from '@/lib/types';

export interface DeactivationResponse {
  status: string;
  caseId: string;
  deactivations: CredentialDeactivationItem[];
}

export interface ActionDeactivationResponse {
  status: string;
  message: string;
  item: CredentialDeactivationItem;
}

export interface PurgeDetailsResponse {
  status: string;
  message: string;
  purgedAt: string;
  auditHash: string;
  complianceRef: string;
}

export interface SurrenderLetterResponse {
  status: string;
  caseId: string;
  deactId: string;
  credentialType: string;
  authority: string;
  formRequired: string;
  letterContent: string;
}

export async function getCaseDeactivations(caseId: string): Promise<DeactivationResponse> {
  return apiClient<DeactivationResponse>(`/api/v1/deactivation/${caseId}`);
}

export async function initiateDeactivation(caseId: string, deactId: string): Promise<ActionDeactivationResponse> {
  return apiClient<ActionDeactivationResponse>(`/api/v1/deactivation/${caseId}/initiate/${deactId}`, {
    method: 'POST',
  });
}

export async function completeDeactivation(caseId: string, deactId: string): Promise<ActionDeactivationResponse> {
  return apiClient<ActionDeactivationResponse>(`/api/v1/deactivation/${caseId}/complete/${deactId}`, {
    method: 'POST',
  });
}

export async function purgeDeceasedIdentityDetails(caseId: string): Promise<PurgeDetailsResponse> {
  return apiClient<PurgeDetailsResponse>(`/api/v1/deactivation/${caseId}/purge-details`, {
    method: 'POST',
  });
}

export async function getSurrenderLetter(caseId: string, deactId: string): Promise<SurrenderLetterResponse> {
  return apiClient<SurrenderLetterResponse>(`/api/v1/deactivation/${caseId}/surrender-letter/${deactId}`);
}
