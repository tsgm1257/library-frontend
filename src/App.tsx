import { RouterProvider, createBrowserRouter } from "react-router";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <BookList /> },
  { path: "/create-book", element: <AddBook /> },
  { path: "/borrow/:bookId", element: <BorrowBook /> },
  { path: "/borrow-summary", element: <BorrowSummary /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
