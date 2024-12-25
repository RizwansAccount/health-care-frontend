import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config, getLocalStore, KEYS } from "../constants";

const TAG_TYPES = { user: 'user', appointment: 'appointment', chat: 'chat', prescription: 'prescription', timeslot: 'timeslot' }

export const healthCareApi = createApi({
    reducerPath: "healthCareApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.serverApiUrl,
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const storedToken = getLocalStore(KEYS.userToken);
            if (storedToken && endpoint !== 'refresh') {
                headers.set('Authorization', `Bearer ${storedToken}`);
            }
            return headers;
        },
    }),
    tagTypes: [TAG_TYPES.appointment, TAG_TYPES.chat, TAG_TYPES.prescription, TAG_TYPES.timeslot, TAG_TYPES.user],
    endpoints: (builder) => ({
        // users
        getAllUsers: builder.query({ query: () => 'user', providesTags: () => [TAG_TYPES.user] }),
        login: builder.mutation({ query: (data) => ({ url: 'user/login', method : 'POST', body: data }) })
    })
});

export const {

    useGetAllUsersQuery, useLoginMutation

} = healthCareApi;