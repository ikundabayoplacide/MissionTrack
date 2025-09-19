import { apiSlice } from "../apiEntry";

export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<any, void>({
      query: () => ({
        url: "/company/allcompanies",
        method: "GET",
      }),
    }),

    createCompany: builder.mutation<any, any>({
      query: (data) => ({
        url: "/company/register",
        method: "POST",
        body: data,
      }),
    }),

    updateCompany: builder.mutation<any, { id: string | number; data: any }>({
      query: ({ id, data }) => ({
        url: `/company/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteCompany: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/company/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
