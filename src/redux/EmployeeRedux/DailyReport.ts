import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ReportState {
    reports: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ReportState = {
    reports: [],
    loading: false,
    error: null,
};

// Async thunk to fetch reports
export const createDailyReport = createAsyncThunk(
    'reports/create',
    async (reportData: FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/reports/`, reportData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }

            });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const AllReports = createAsyncThunk(
    'reports/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reports/`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchReportsByMissionId = createAsyncThunk(
    'reports/fetchByMissionId',
    async (missionId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reports/mission/${missionId}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const reportSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        clearReports(state) {
            state.reports = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AllReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AllReports.fulfilled, (state, action) => {
                state.loading = false;
                state.reports = action.payload;
            })
            .addCase(AllReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchReportsByMissionId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReportsByMissionId.fulfilled, (state, action) => {
                state.loading = false;
                state.reports = action.payload;
            })
            .addCase(fetchReportsByMissionId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createDailyReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDailyReport.fulfilled, (state, action) => {
                state.loading = false;
                state.reports.push(action.payload);
            })
            .addCase(createDailyReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearReports } = reportSlice.actions;

export default reportSlice.reducer;