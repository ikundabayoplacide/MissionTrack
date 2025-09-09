import { Router } from 'express';
import userRouter from './userRouters';
import { missionRoutes } from './missionRoutes';
import dailyRoutes from './dailyReport';


const routers = Router();
const allRoutes=[userRouter,missionRoutes,dailyRoutes];
routers.use('/api',...allRoutes);

export { routers };
