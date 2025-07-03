import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../features/book/book.api";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";

const BookList = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!selectedBookId) return;
    try {
      await deleteBook(selectedBookId).unwrap();
      toast.success("Book deleted");
    } catch {
      toast.error("Failed to delete book");
    } finally {
      setSelectedBookId(null);
    }
  };

  if (isLoading) return <div className="p-4">Loading books...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Failed to load books.</div>;

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
              <th>Actions</th>
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
                <td>{book.available ? "Yes" : "No"}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => navigate(`/borrow/${book._id}`)}
                    >
                      Borrow
                    </button>
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => setSelectedBookId(book._id!)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog
        id="delete_modal"
        className={`modal ${selectedBookId ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this book?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button
                type="button"
                className="btn"
                onClick={() => setSelectedBookId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-error"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookList;
