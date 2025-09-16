import { apiSlice } from "../apiEntry";

export const missionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMissions: builder.query<any, void>({
      query: () => ({
        url: "/missions",
        method: "GET",
      }),
    }),

    createMission: builder.mutation<any, any>({
      query: (data) => ({
        url: "/missions",
        method: "POST",
        body: data,
      }),
    }),

    updateMission: builder.mutation<any, { id: string | number; data: any }>({
      query: ({ id, data }) => ({
        url: `/missions/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteMission: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/missions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMissionsQuery,
  useCreateMissionMutation,
  useUpdateMissionMutation,
  useDeleteMissionMutation,
} = missionApi;
