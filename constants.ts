import { User, UserRole, Mine, Deal, Commission, Notification, DealStage } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Global Tech Industries', companyName: 'Global Tech', email: 'buyer@ndna.com', role: UserRole.BUYER, verified: true },
  { id: 'u2', name: 'Copper Ridge Mining', companyName: 'Copper Ridge', email: 'seller@ndna.com', role: UserRole.SELLER, verified: true },
  { id: 'u3', name: 'Alex Broker', companyName: 'Prime Connect', email: 'broker@ndna.com', role: UserRole.INTERMEDIARY, verified: true },
  { id: 'u4', name: 'NDNA Admin', companyName: 'NDNA Platform', email: 'admin@ndna.com', role: UserRole.ADMIN, verified: true },
];

export const MOCK_MINES: Mine[] = [
  { id: 'm1', name: 'Katanga Copper Belt', commodity: 'Copper Cathodes', country: 'DRC', capacity: '5000 MT/mo', status: 'Active', ownerId: 'u2', imageUrl: 'https://picsum.photos/400/300?random=1' },
  { id: 'm2', name: 'Zambezi Gold Source', commodity: 'Gold Bullion', country: 'Zambia', capacity: '200 kg/mo', status: 'Pending Verification', ownerId: 'u2', imageUrl: 'https://picsum.photos/400/300?random=2' },
  { id: 'm3', name: 'Lithium Valley', commodity: 'Spodumene', country: 'Zimbabwe', capacity: '10000 MT/mo', status: 'Active', ownerId: 'u5', imageUrl: 'https://picsum.photos/400/300?random=3' },
];

export const MOCK_DEALS: Deal[] = [
  { id: 'd1', mineId: 'm1', mineName: 'Katanga Copper Belt', buyerId: 'u1', sellerId: 'u2', value: 45000000, stage: DealStage.SPA_SIGNED, commodity: 'Copper', quantity: '5000 MT', lastActivity: '2 hours ago' },
  { id: 'd2', mineId: 'm3', mineName: 'Lithium Valley', buyerId: 'u1', sellerId: 'u5', value: 12000000, stage: DealStage.NEGOTIATION, commodity: 'Lithium', quantity: '2000 MT', lastActivity: '1 day ago' },
];

export const MOCK_COMMISSIONS: Commission[] = [
  { id: 'c1', dealId: 'd1', intermediaryName: 'Alex Broker', role: 'Introducer', percentage: 1.5, amount: 675000, status: 'Processing' },
  { id: 'c2', dealId: 'd1', intermediaryName: 'Sarah Connect', role: 'Facilitator', percentage: 0.5, amount: 225000, status: 'Pending' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Deal Update', message: 'SPA Signed for Deal #D1', type: 'success', timestamp: '10:30 AM', read: false },
  { id: 'n2', title: 'Action Required', message: 'Please upload TT Proof for Deal #D1', type: 'warning', timestamp: '09:15 AM', read: false },
  { id: 'n3', title: 'Verification', message: 'Mine "Zambezi Gold" documents under review', type: 'info', timestamp: 'Yesterday', read: true },
];
