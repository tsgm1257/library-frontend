import { useState } from "react";
import { useAddBookMutation } from "../features/book/book.api";
import { useNavigate } from "react-router";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook({ ...form, copies: Number(form.copies) }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          className="input input-bordered w-full"
          value={form.author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          className="input input-bordered w-full"
          value={form.genre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          className="input input-bordered w-full"
          value={form.isbn}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="copies"
          placeholder="Copies"
          className="input input-bordered w-full"
          value={form.copies}
          onChange={handleChange}
          min={1}
          required
        />
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
