export type Role = 'admin' | 'agent' | 'receptionist';
export type ClientStatus = 'lead' | 'active' | 'granted' | 'closed';
export type CaseStatus = 'assessment' | 'documents' | 'lodged' | 'decision' | 'granted' | 'refused';
export type Priority = 'high' | 'medium' | 'low';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  active: boolean;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  citizenship: string;
  currentVisa?: string;
  currentLocation: 'in-australia' | 'outside-australia';
  status: ClientStatus;
  assignedAgentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Case {
  id: string;
  clientId: string;
  visaType: string;
  subclass: string;
  status: CaseStatus;
  assignedAgentId?: string;
  lodgementDate?: string;
  decisionDate?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  caseId: string;
  clientId: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Note {
  id: string;
  clientId?: string;
  caseId?: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface Task {
  id: string;
  assignedTo: string;
  clientId?: string;
  caseId?: string;
  title: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export interface SessionPayload {
  staffId: string;
  role: Role;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}
