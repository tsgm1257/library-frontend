import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 shadow mb-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Library
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/books" className="btn btn-sm btn-ghost">
          All Books
        </Link>
        <Link to="/create-book" className="btn btn-sm btn-ghost">
          Add Book
        </Link>
        <Link to="/borrow-summary" className="btn btn-sm btn-ghost">
          Borrow Summary
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
