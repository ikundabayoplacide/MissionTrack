import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ActionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string | null;
    status?: any[];
    state?: any;
}

const initialState: ActionState = {
    loading: false,
    success: false,
    error: null,
    message: null,
    status: [],
    state: null,
};

// src/redux/actionSlice.ts
export const approveOrRejectCompany = createAsyncThunk(
    "company/approveOrReject",
    async (
        {
            companyId,
            action,
            comment,
        }: { companyId: string; action: "approve" | "reject"; comment?: string },
        { rejectWithValue }
    ) => {
        try {
            const status = action === "approve" ? "approved" : "rejected";
            const payload: any = { status };
            if (comment) {
                payload.comment = comment;
            }
            console.log("🔄 Approve/Reject - Payload being sent:", payload);
            console.log("🔑 Token exists:", !!localStorage.getItem("token"));

            const res = await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/company/approveReject/${companyId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            console.log("✅ Approve/Reject - Success:", res.data);
            return res.data;

        } catch (error: any) {
            console.error("❌ approveOrRejectCompany error:", {
                status: error.response?.status,
                message: error.response?.data?.message,
                data: error.response?.data
            });
            return rejectWithValue(
                error.response?.data?.message || "Failed to approve/reject company"
            );
        }
    }
);
// codes for block and unblock company can be added here similarly

export const blockOrUnblockCompany = createAsyncThunk(
    "company/blockOrUnblock",
    async (
        {
            companyId,
            action,
            comment,
        }: { companyId: string; action: "block" | "active"; comment?: string },
        { rejectWithValue }
    ) => {
        try {
            const state = action === "block" ? "blocked" : "active";
            const payload: any = { state };
            if (comment) {
                payload.comment = comment;
            }

            console.log("🔄 Block/Unblock - Payload being sent:", payload);
            console.log("🔑 Token exists:", !!localStorage.getItem("token"));

            const res = await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/company/block/${companyId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            console.log("✅ Block/Unblock - Success:", res.data);
            return res.data;

        } catch (error: any) {
            console.error("❌ blockOrUnblockCompany error:", {
                status: error.response?.status,
                message: error.response?.data?.message,
                data: error.response?.data
            });
            return rejectWithValue(
                error.response?.data?.message || "Failed to block/unblock company"
            );
        }
    }
);
const actionSlice = createSlice({
    name: "action",
    initialState,
    reducers: {
        clearActionState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(approveOrRejectCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(approveOrRejectCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
                state.status = action.payload.status;
            })
            .addCase(approveOrRejectCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // about block and unblock
        builder
            .addCase(blockOrUnblockCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(blockOrUnblockCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
                state.state = action.payload.state;
            })
            .addCase(blockOrUnblockCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearActionState } = actionSlice.actions;
export default actionSlice.reducer;