import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),

  tagTypes: ["Borrow"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      void,
      { bookId: string; data: { quantity: number; dueDate: string } }
    >({
      query: ({ bookId, data }) => ({
        url: `borrows/${bookId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrow"],
    }),

    getBorrowSummary: builder.query<
      { title: string; isbn: string; totalBorrowed: number }[],
      void
    >({
      query: () => "borrow-summary",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
