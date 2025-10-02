import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CompanyState {
  loading: boolean;
  success: boolean;
  error: string | null;
  action:null;
  message: string | null;
  companies?: any[];
  singleCompany?: any | null;
}

const initialState: CompanyState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  companies: [],
  action:null,
  singleCompany: null,
};


type RejectString = string;



// Async thunk for registering company
export const registerCompany = createAsyncThunk(
  "company/register",
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://missiontrack-backend.onrender.com/api/company/register",
        formData
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getSingleCompany = createAsyncThunk(
  "company/getSingle",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://missiontrack-backend.onrender.com/api/company/${companyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      return res.data;
    } catch (err: any) {
      console.error("getSingleCompany error object:", err);
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getAllCompanies = createAsyncThunk(
  "company/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://missiontrack-backend.onrender.com/api/company/allCompanies",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);


export const deleteCompany = createAsyncThunk(
  "company/delete",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`https://missiontrack-backend.onrender.com/api/company/${companyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      return res.data;
    } catch (err: any) {
      console.error("deleteCompany error object:", err);
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
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
    // create new company
    builder
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.companies?.push(action.payload.company);
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

// GETTING all companies
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.companies = action.payload.data || []; //save companies
        state.error = null;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // get single company
    builder
      .addCase(getSingleCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSingleCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.singleCompany = action.payload.data || null;
        state.error = null;
      })
      .addCase(getSingleCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
 
    
  },
});

export const { resetCompanyState } = companySlice.actions;
export default companySlice.reducer;