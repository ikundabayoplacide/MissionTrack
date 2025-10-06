import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./companyRedux/companySlice";
import actionReducer from "./companyRedux/actionSlice";
import profileReducer from "./profileSlice";
import missionsReducer from "./EmployeeRedux/EmpMissions";
import expenseLogsReducer from "./EmployeeRedux/ExpenseLogs";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    adminAction: actionReducer,
    profile: profileReducer,
    EmployeeMissions: missionsReducer,
    ExpenseLogs:expenseLogsReducer
  },
});

// ✅ Types for usage with useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
