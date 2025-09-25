export interface CreateMissionActionParams {
  missionId: string;
  action: 'Approve' | 'Reject' | 'Update' | 'Cancel' | 'Complete';
}

export interface UpdateMissionActionParams {
  action?: 'Approve' | 'Reject' | 'Update' | 'Cancel' | 'Complete';
  accomodationAmount?: number;
  transportAmount?: number;
  dailyAllowanceAmount?: number;
  totalAmount?: number;
  comment?: string;
}
