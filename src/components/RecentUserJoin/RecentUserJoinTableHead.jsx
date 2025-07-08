import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllRecentUserQuery } from "../../features/dashboard/UserApi";
import Pagination from '../RecentDriverJoin/Pagination';
import RecentUserJoinTableBody from "./RecentUserJoinTableBody";
import { Spin } from 'antd';

const RecentUserJoinTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { data: apiResponse, isLoading, isFetching } = useGetAllRecentUserQuery(currentPage);

  if (isLoading) {
    return <div className="text-center py-4">Loading users...</div>;
  }

  // Transform API data to match the expected format
  const transformedData = apiResponse?.data?.map(user => ({
    id: user._id,
    userName: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber || "N/A",
    joiningDate: new Date(user.createdAt).toLocaleDateString('en-GB'),
    booking: "No", // This should come from your API if available
    status: user.status || "inactive",
  })) || [];

  // Calculate total pages based on backend response
  const totalItems = apiResponse?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header - fixed to show 5 columns */}
        <div className="grid grid-cols-6 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns?.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isFetching ? (
            <div className="py-4 text-center"><Spin size='small'/></div>
          ) : transformedData.length > 0 ? (
            transformedData.map((item, i) => (
              <RecentUserJoinTableBody
                item={item}
                key={item.id}
                list={(currentPage - 1) * itemsPerPage + i + 1}
                columns={columns.slice(0, 5)}
              />
            ))
          ) : (
            <div className="py-4 text-center">No recent users found</div>
          )}
        </div>

        {/* Pagination - only show if there are multiple pages */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isFetching}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentUserJoinTableHead;