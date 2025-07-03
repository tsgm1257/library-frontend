import { useGetBooksQuery } from '../features/book/book.api';

const BookList = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <div className="p-4">Loading books...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load books.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Copies</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>{book.copies}</td>
                <td>{book.available ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
