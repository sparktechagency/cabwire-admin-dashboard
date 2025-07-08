import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserManagementQuery } from '../features/userManagement/userManagementApi';
import UserManagementTableRow from "./UserManagementTableRow";
import Pagination from './RecentDriverJoin/Pagination';

const Table = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const searchValue = queryParams.get("search") || "";
  const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get("page")) || 1);

  const { data, isLoading, isFetching } = useGetUserManagementQuery({
    page: currentPage,
    searchValue
  });

  // Update URL when page changes
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (currentPage > 1) newParams.set("page", currentPage);
    if (searchValue) newParams.set("search", searchValue);
    navigate({ search: newParams.toString() }, { replace: true });
  }, [currentPage, searchValue, navigate]);

  const users = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;
  const totalItems = data?.meta?.total || 0;
  const itemsPerPage = data?.meta?.limit || 10;

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <main className="overflow-x-auto">
      <section className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header section */}
        <div className="grid grid-cols-9 text-center border-2 border-opacity-50 rounded-lg justify-items-stretch bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 text-sm font-semibold">
              {column}
            </div>
          ))}
        </div>

        {/* Body section */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isFetching ? (
            <div className="py-8 text-center">Loading users...</div>
          ) : users.length > 0 ? (
            users.map((user, i) => (
              <UserManagementTableRow
                key={user._id}
                user={user}
                list={i + 1 + ((currentPage - 1) * itemsPerPage)}
              />
            ))
          ) : (
            <div className="py-8 text-center">No users found</div>
          )}
        </div>

        {/* Pagination - only show if there are multiple pages */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              isLoading={isFetching}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Table;