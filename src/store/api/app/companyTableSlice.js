import { apiSlice } from "../apiSlice";


export const CampaignTableApi = apiSlice.injectEndpoints({
endpoints:(builder) =>({
    getCampaigns: builder.query({
        query: (data) => {
            return {
                url: `/project?email=${data.email}`,
                method: "GET",
            }
        },
    }),
})
})

export const { useGetCampaignsQuery } = CampaignTableApi;
