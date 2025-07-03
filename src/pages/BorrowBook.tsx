import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useGetBookQuery } from "../features/book/book.api";
import { useBorrowBookMutation } from "../features/borrow/borrow.api";

const BorrowBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ quantity: 1, dueDate: "" });

  const { data: book, isLoading } = useGetBookQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await borrowBook({
        bookId: bookId!,
        data: {
          quantity: Number(form.quantity),
          dueDate: form.dueDate,
        },
      }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Borrow failed:", err);
    }
  };

  if (isLoading || !book) return <p>Loading book...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Borrow "{book.title}"</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="quantity"
          min={1}
          max={book.copies}
          value={form.quantity}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Quantity"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={isBorrowing}
        >
          {isBorrowing ? "Submitting..." : "Borrow"}
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
