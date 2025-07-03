import { useParams, useNavigate } from 'react-router';
import { useGetBookQuery, useUpdateBookMutation } from '../features/book/book.api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetBookQuery(id as string);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
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
      });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({ id: id!, data: { ...form, copies: Number(form.copies) } }).unwrap();
      toast.success('Book updated successfully');
      navigate('/');
    } catch {
      toast.error('Failed to update book');
    }
  };

  if (isLoading) return <p className="p-4">Loading book...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
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
        />
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
        <button type="submit" className="btn btn-primary w-full" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
