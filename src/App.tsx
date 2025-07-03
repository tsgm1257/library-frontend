import { RouterProvider, createBrowserRouter } from "react-router";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditBook from "./pages/EditBook";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full">{children}</main>
      <Footer />
    </div>
  );
};

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
  {
    path: "/edit-book/:id",
    element: (
      <AppLayout>
        <EditBook />
      </AppLayout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
