import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchJDListRequestPayload } from '../types';

const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.weekday.technology/",
});

export const jobApi = createApi({
    reducerPath: "jdListReducer",
    baseQuery,
    endpoints: (builder) => ({
        getJDList: builder.query({
            query: (body: Record<string, FetchJDListRequestPayload>) => ({
                url: "adhoc/getSampleJdJSON",
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
             }),
        }),
    })
});

export const { useGetJDListQuery } = jobApi;
