import { useParams, useNavigate } from "react-router";
import { useGetBookQuery } from "../features/book/book.api";
import { useBorrowBookMutation } from "../features/borrow/borrow.api";
import { useState } from "react";
import toast from "react-hot-toast";

const BorrowBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetBookQuery(bookId as string);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [form, setForm] = useState({
    quantity: 1,
    dueDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "quantity" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.quantity > (book?.copies ?? 0)) {
      toast.error("Requested quantity exceeds available copies");
      return;
    }

    try {
      await borrowBook({ bookId: bookId!, data: form }).unwrap();
      toast.success("Book borrowed successfully");
      navigate("/borrow-summary");
    } catch {
      toast.error("Failed to borrow book");
    }
  };

  if (isLoading) return <p className="p-4">Loading book details...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Borrow Book</h2>
      <div className="mb-4 p-4 bg-base-200 rounded shadow">
        <p>
          <strong>Title:</strong> {book?.title}
        </p>
        <p>
          <strong>Available Copies:</strong> {book?.copies}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="form-control w-full">
          <span className="label-text font-semibold">Quantity to Borrow</span>
          <input
            type="number"
            name="quantity"
            min={1}
            max={book?.copies}
            className="input input-bordered w-full"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text font-semibold">Due Date</span>
          <input
            type="date"
            name="dueDate"
            className="input input-bordered w-full"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isBorrowing}
        >
          {isBorrowing ? "Processing..." : "Borrow Book"}
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
