import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface ExpenseLog {
    id: number;
    employeeId: number;
    missionId: number;
    accommodationAmount: number;
    mealsAmount: number;
    transportAmount: number;
    accommodationFile: string;
    mealsFile: string;
    transportFile: string;
    description: string;
    date: string;
}

const initialState = {
    loading: false,
    success: false,
    error: null as string | null,
    message: null as string | null,
    expenseLogs: [] as ExpenseLog[],
    expenseLog: null as ExpenseLog | null,
};


export const uploadExpenseLog = createAsyncThunk(
    "expenseLogs/upload",
    async (expenseData: FormData, { rejectWithValue }) => {
        try {
            const res = await axios.post("https://missiontrack-backend.onrender.com/api/expenselog", expenseData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                }
            });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const fetchExpenseLogs= createAsyncThunk(
    "expenseLogs/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("https://missiontrack-backend.onrender.com/api/expenselogs", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const fetchExpenseLogsByMissionId= createAsyncThunk(
    "expenseLogs/fetchByMission",
    async (missionId: string, { rejectWithValue }) => {
        try {
            const res = await axios.get(`https://missiontrack-backend.onrender.com/api/expenselogs/mission/${missionId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

const expenseLogsSlice = createSlice({
    name: "expenseLogs",
    initialState,
    reducers: {
        clearState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.message = null;
            state.expenseLog = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadExpenseLog.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(uploadExpenseLog.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.expenseLog = action.payload.expenseLog || action.payload || null;
                state.message = action.payload.message || "Expense log uploaded successfully";
            })
            .addCase(uploadExpenseLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to upload expense log";
            })
            .addCase(fetchExpenseLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchExpenseLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.expenseLogs = action.payload.expenseLogs || action.payload || [];
            })
            .addCase(fetchExpenseLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch expense logs";
            })
            .addCase(fetchExpenseLogsByMissionId.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchExpenseLogsByMissionId.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.expenseLogs = action.payload.expenseLogs || action.payload || [];
            })
            .addCase(fetchExpenseLogsByMissionId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch expense logs for the mission";
            });
    },
});

export const { clearState } = expenseLogsSlice.actions;
export default expenseLogsSlice.reducer;