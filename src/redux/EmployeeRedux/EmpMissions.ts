import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface MissionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string | null;
    missions?: any[],
    mission?: any | null;
}

const initialState: MissionState = {
    loading: false,
    success: false,
    error: null,
    message: null,
    missions: [],
    mission: null,
};

// Async thunk for fetching missions
export const fetchEmployeeMissions = createAsyncThunk(
    "missions/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/missions/employee`, {
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
const missionsSlice = createSlice({
    name: "missions",
    initialState,
    reducers: {
        clearState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.message = null;
            state.mission = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeMissions.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchEmployeeMissions.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.missions = action.payload.data || [];

            })
            .addCase(fetchEmployeeMissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearState } = missionsSlice.actions;
export default missionsSlice.reducer;