// src/redux/companySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CompanyState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: CompanyState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

const API_URL = "https://missiontrack-backend.onrender.com/api/company/register";

type RejectString = string;

// Helper: normalize rwandan numbers to +250xxxxxxxxx
const normalizeRWPhone = (input?: string) => {
  if (!input) return "";
  let s = input.trim();
  // remove spaces
  s = s.replace(/\s+/g, "");
  if (s.startsWith("07")) return "+250" + s.slice(1);
  if (s.startsWith("250") && !s.startsWith("+")) return "+" + s;
  return s;
};

// Async thunk for registering company
export const registerCompany = createAsyncThunk<any, any, { rejectValue: RejectString }>(
  "company/register",
  async (formData: any, { rejectWithValue }) => {
    try {
      const data = new FormData();

      // --- Flexible key extraction (accept multiple naming variants) ---
      const companyName = formData.companyName || formData.organizationName || "";
      const companyEmail = formData.companyEmail || formData.email || "";
      const companyContactRaw =
        formData.companyContact ||
        formData.companyPhoneNumber ||
        formData.companyPhone ||
        formData.company_contact ||
        "";
      const companyContact = normalizeRWPhone(companyContactRaw);

      const province = formData.province || "";
      const district = formData.district || "";
      const sector = formData.sector || "";

      const fullName = formData.fullName || formData.person || formData.managerName || "";
      const managerPhoneRaw =
        formData.phoneNumber || formData.phone || formData.managerPhone || "";
      const managerPhone = normalizeRWPhone(managerPhoneRaw);
      const managerEmail = formData.managerEmail || formData.email || "";

      const password = formData.password || "";

      // --- Append to FormData (only append non-empty values) ---
      if (companyName) data.append("companyName", companyName);
      if (companyEmail) data.append("companyEmail", companyEmail);
      if (companyContact) data.append("companyContact", companyContact);
      if (province) data.append("province", province);
      if (district) data.append("district", district);
      if (sector) data.append("sector", sector);

      if (fullName) data.append("fullName", fullName);
      if (managerPhone) data.append("phoneNumber", managerPhone);
      if (managerEmail) data.append("email", managerEmail);
      if (password) data.append("password", password);

      // --- Attach file robustly: check multiple keys the frontend might use ---
      const candidateFile =
        formData.proofDocument ||
        (formData.files && formData.files[0]) ||
        formData.file ||
        formData.proof ||
        null;

      if (candidateFile) {
        data.append("proofDocument", candidateFile);
      }

      // Debugging: print FormData keys & values to console (File objects will show as File)
      // This helps you confirm exactly what's being sent in the browser console
      console.group("registerCompany FormData contents");
      for (const pair of (data as any).entries()) {
        console.log(pair[0], pair[1]);
      }
      console.groupEnd();

      // Note: Do NOT manually set Content-Type header here in the browser — axios will
      // set the correct multipart/form-data boundary automatically.
      const res = await axios.post(API_URL, data);

      // Return backend response (so .fulfilled receives res.data)
      return res.data;
    } catch (err: any) {
      console.error("registerCompany error object:", err);

      // If backend responded with JSON error body, prefer that message
      if (err.response) {
        const resp = err.response;
        // Try common places for messages
        const maybeMessage =
          resp.data?.message ||
          resp.data?.error ||
          (typeof resp.data === "string" ? resp.data : null);

        const statusPart = resp.status ? ` (status ${resp.status})` : "";
        const message = maybeMessage
          ? `${maybeMessage}${statusPart}`
          : `Request failed${statusPart}`;

        console.error("registerCompany server response:", resp.data);
        return rejectWithValue(message);
      }

      // Network / other errors
      const fallback = err.message || "Network error";
      return rejectWithValue(fallback);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    resetCompanyState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // backend usually returns { message, data, success }
        state.message = action.payload?.message ?? "Company created";
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        // action.payload is the string we passed into rejectWithValue
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export const { resetCompanyState } = companySlice.actions;
export default companySlice.reducer;