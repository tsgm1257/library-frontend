import { useState } from "react";
import { useAddBookMutation } from "../features/book/book.api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const AddBook = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true, // optional toggle
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { ...form, copies: Number(form.copies) };

    try {
      await addBook(payload).unwrap();
      toast.success("Book added");
      navigate('/books');
    } catch {
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="form-control w-full">
          <span className="label-text font-semibold">Title</span>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text font-semibold">Author</span>
          <input
            type="text"
            name="author"
            className="input input-bordered w-full"
            value={form.author}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text font-semibold">Genre</span>
          <input
            type="text"
            name="genre"
            className="input input-bordered w-full"
            value={form.genre}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text font-semibold">ISBN</span>
          <input
            type="text"
            name="isbn"
            className="input input-bordered w-full"
            value={form.isbn}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text font-semibold">Description</span>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text font-semibold">Copies</span>
          <input
            type="number"
            name="copies"
            className="input input-bordered w-full"
            value={form.copies}
            onChange={handleChange}
            min={1}
            required
          />
        </label>

        <label className="form-control w-full flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="available"
            className="checkbox"
            checked={form.available}
            onChange={handleChange}
          />
          <span className="label-text">Available</span>
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
