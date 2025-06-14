import {apiSlice} from "../apiSlice";


export const waitlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWaitlistConfig: builder.query({
            query: () => "/waitlist",
        }),
        getWaitlistConfigById: builder.query({
            query: (id) => `/waitlist/${id}`,
        }),
        saveWaitlistConfig: builder.mutation({
            query: (config) => ({
                url: "/waitlist",
                method: "POST",
                body: {
                    
                        "name": "Beta Access List",
                        "projectId": "3fa9bd21-3b33-4fa8-ad0a-cf7bfeb38bf0",
                        "organisationId": "3fce7bb4-d7ac-41a3-9fe5-a76e92a86c24",
                        "currentSignups": 0,
                        "maxSignups": 1000,
                        "slug": "beta-access",
                        "allowReferrals": true,
                        "referralBonusPosition": 2,
                        "metadata": config
                      
                },
            }),
        }),
    }),
});

export const {
    useSaveWaitlistConfigMutation,
    useGetWaitlistConfigQuery,
    useGetWaitlistConfigByIdQuery,
} = waitlistApiSlice;