import { useParams, useNavigate } from 'react-router';
import { useGetBookQuery } from '../features/book/book.api';
import { Link } from 'react-router';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookQuery(id!);

  if (isLoading) return <p className="p-4">Loading book details...</p>;
  if (isError || !book) return <p className="p-4 text-red-500">Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Book Details</h2>
      <div className="space-y-4 bg-base-200 p-6 rounded-lg shadow">
        <div>
          <strong>Title:</strong> {book.title}
        </div>
        <div>
          <strong>Author:</strong> {book.author}
        </div>
        <div>
          <strong>Genre:</strong> {book.genre}
        </div>
        <div>
          <strong>ISBN:</strong> {book.isbn}
        </div>
        <div>
          <strong>Copies:</strong> {book.copies}
        </div>
        <div>
          <strong>Available:</strong> {book.available ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Description:</strong>
          <p className="mt-1">{book.description || 'No description provided.'}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link to="/books" className="btn btn-outline">Back to All Books</Link>
        {book.available && book.copies > 0 && (
          <button onClick={() => navigate(`/borrow/${book._id}`)} className="btn btn-primary">
            Borrow This Book
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
