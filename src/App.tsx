import { RouterProvider, createBrowserRouter } from "react-router";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";
import Navbar from "./components/Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <div className="max-w-6xl mx-auto">{children}</div>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <BookList />
      </AppLayout>
    ),
  },
  {
    path: "/create-book",
    element: (
      <AppLayout>
        <AddBook />
      </AppLayout>
    ),
  },
  {
    path: "/borrow/:bookId",
    element: (
      <AppLayout>
        <BorrowBook />
      </AppLayout>
    ),
  },
  {
    path: "/borrow-summary",
    element: (
      <AppLayout>
        <BorrowSummary />
      </AppLayout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
