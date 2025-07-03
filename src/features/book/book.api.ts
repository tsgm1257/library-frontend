import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<
      {
        data: Book[];
        meta: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      },
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `books?page=${page}&limit=${limit}`,
      providesTags: ["Book"],
    }),

    getBook: builder.query<Book, string>({
      query: (id) => `books/${id}`,
      providesTags: (_, __, id) => [{ type: "Book", id }],
    }),

    addBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: "books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),

    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Book", id }, "Book"],
    }),

    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
