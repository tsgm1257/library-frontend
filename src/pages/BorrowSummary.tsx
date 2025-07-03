import { useGetBorrowSummaryQuery } from '../features/borrow/borrow.api';

const BorrowSummary = () => {
  const { data: summary, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading) return <p className="p-4">Loading summary...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load summary.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Borrow Summary</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>ISBN</th>
              <th>Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {summary?.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.isbn}</td>
                <td>{item.totalBorrowed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
