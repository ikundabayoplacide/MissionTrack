interface CreateMissionActionParams {
  missionId: string;
  actorId: string;
  action: 'Approve' | 'Reject' | 'Update' | 'Cancel';
  comment?: string;
}

interface UpdateMissionActionParams{
    missionId?:string,
     action: 'Approve' | 'Reject' | 'Update' | 'Cancel';
     comment?:string
}

export {CreateMissionActionParams, UpdateMissionActionParams};