import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllRecentDriverQuery } from "../../features/dashboard/driverApi";
import Pagination from './Pagination';
import RecentDriverJoinTableBody from "./RecentDriverJoinTableBody";
import { Spin } from 'antd';

const RecentDriverJoinTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // This should match your limit in the API query

  // Use the currentPage in the query
  const { data: apiData, isLoading, isFetching } = useGetAllRecentDriverQuery(currentPage);

  if (isLoading) {
    return <div className="text-center py-4">Loading drivers...</div>;
  }

  // Transform API data to match the expected format
  const transformedData = apiData?.data?.map(driver => ({
    id: driver._id,
    driverName: driver.name || "N/A",
    email: driver.email || "N/A",
    phoneNumber: driver.phoneNumber || "N/A",
    carMake: driver.driverVehicles?.vehiclesMake || "N/A",
    carModel: driver.driverVehicles?.vehiclesModel || "N/A",
    licenseNumber: driver.driverLicense?.licenseNumber || "N/A",
    status: driver.status || "inactive",
    joinDate: new Date(driver.createdAt).toLocaleDateString() || "N/A",
    image: driver.image || "https://i.ibb.co/z5YHLV9/profile.png"
  })) || [];

  const totalPages = apiData?.meta?.totalPage || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header - reduced to 5 columns */}
        <div className="grid grid-cols-8 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns?.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isFetching ? (
            <div className="py-4 text-center"><Spin size='small' /></div>
          ) : transformedData.length > 0 ? (
            transformedData.map((item, i) => (
              <RecentDriverJoinTableBody
                item={item}
                key={item.id}
                list={(currentPage - 1) * itemsPerPage + i + 1}
                columns={columns.slice(0, 5)}
              />
            ))
          ) : (
            <div className="py-4 text-center">No recent drivers found</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-4">
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

export default RecentDriverJoinTableHead;