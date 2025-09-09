export interface IDailyReport {
  id?: string;
  missionId: string;
  date: Date;
  dailyActivity: string;
  documents?: string | null;
  filePath?: string | null;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface DailyReportCreate {
  missionId: string;
  date: Date;
  dailyActivity: string;
  documents?: string | null;
  filePath?: string | null;
  description?: string | null;
}

export interface DailyReportUpdate {
  date?: Date;
  dailyActivity?: string;
  documents?: string | null;
  filePath?: string | null;
  description?: string | null;
}