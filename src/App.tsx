import { RouterProvider, createBrowserRouter } from "react-router";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BorrowBook from './pages/BorrowBook';

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <BookList /> },
  { path: "/create-book", element: <AddBook /> },
  { path: '/borrow/:bookId', element: <BorrowBook /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
