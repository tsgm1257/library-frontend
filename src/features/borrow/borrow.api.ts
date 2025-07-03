import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<void, { bookId: string; data: { quantity: number; dueDate: string } }>({
      query: ({ bookId, data }) => ({
        url: `borrows/${bookId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Borrow'],
    }),

    getBorrowSummary: builder.query<
      { title: string; isbn: string; totalBorrowed: number }[],
      void
    >({
      query: () => 'borrows/summary',
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApi;
