import { useParams, useNavigate } from "react-router";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../features/book/book.api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetBookQuery(id as string);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
        available: book.available ?? true,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setForm((prev) => {
      const updated = { ...prev, [name]: newValue };

      // business logic: if copies = 0, set available to false
      if (name === "copies" && Number(newValue) === 0) {
        updated.available = false;
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      copies: Number(form.copies),
      available: form.copies === 0 ? false : form.available, // enforce business rule
    };

    try {
      await updateBook({ id: id!, data: payload }).unwrap();
      toast.success("Book updated successfully");
      navigate("/");
    } catch {
      toast.error("Failed to update book");
    }
  };

  if (isLoading) return <p className="p-4">Loading book...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
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
            min={0}
            required
          />
        </label>

        <label className="form-control w-full flex items-center mt-2 gap-2">
          <input
            type="checkbox"
            name="available"
            className="checkbox"
            checked={form.available}
            onChange={handleChange}
            disabled={form.copies === 0} // lock toggle if 0 copies
          />
          <span className="label-text">
            Available
          </span>
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
