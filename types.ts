export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  INTERMEDIARY = 'INTERMEDIARY',
  ADMIN = 'ADMIN'
}

export enum DealStage {
  NEGOTIATION = 'Negotiation',
  SPA_SIGNED = 'SPA Signed',
  LC_OPENED = 'LC Opened',
  LOGISTICS = 'Logistics',
  COMPLETED = 'Completed'
}

export enum DocStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  AI_FLAGGED = 'AI Flagged'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  avatar?: string;
  companyName?: string;
}

export interface Mine {
  id: string;
  name: string;
  commodity: string;
  country: string;
  capacity: string;
  status: 'Active' | 'Pending Verification' | 'Maintenance';
  ownerId: string;
  imageUrl: string;
}

export interface Deal {
  id: string;
  mineId: string;
  mineName: string;
  buyerId: string;
  sellerId: string;
  value: number;
  stage: DealStage;
  commodity: string;
  quantity: string;
  lastActivity: string;
}

export interface Commission {
  id: string;
  dealId: string;
  intermediaryName: string;
  role: string;
  percentage: number;
  amount: number;
  status: 'Pending' | 'Paid' | 'Processing';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isSystem?: boolean;
}
