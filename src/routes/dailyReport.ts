import  { Router } from 'express';
import { dailyReportController } from '../controllers/dailyReport';
import upload from '../middlewares/uploadFiles';

 const dailyRoutes=Router()

dailyRoutes.post('/reports/', upload.single('document'), dailyReportController.createDailyReport);
dailyRoutes.get('/reports/mission/:missionId', dailyReportController.getDailyReportsByMissionId);
dailyRoutes.get('/reports/', dailyReportController.getAllDailyReports);
dailyRoutes.get('/reports/:id', dailyReportController.getDailyReportById);
dailyRoutes.patch('/reports/:id', upload.single('document'), dailyReportController.updateDailyReport);
dailyRoutes.delete('/reports/:id', dailyReportController.deleteDailyReport);

export default dailyRoutes;