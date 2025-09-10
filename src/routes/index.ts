import { Router } from 'express';
import userRouter from './userRouters';
import { missionRoutes } from './missionRoutes';
import dailyRoutes from './dailyReport';
import expenseLogRoutes from './expenseLogs';


const routers = Router();
const allRoutes=[userRouter,missionRoutes,dailyRoutes,expenseLogRoutes];
routers.use('/api',...allRoutes);

export { routers };
