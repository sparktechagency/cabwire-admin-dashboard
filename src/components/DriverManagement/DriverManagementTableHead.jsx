import { Pagination } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { useGetDriverManagementQuery } from '../../features/DriverManagement/driverManagement';
import DriverManagementTableBody from "./DriverManagementTableBody";

const DriverManagementTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get("page")) || 1;
  const searchTerm = queryParams.get("search") || '';

  const { data, isLoading, isError } = useGetDriverManagementQuery({
    page: pageParam,
    searchTerm
  });

  const handlePageChange = (page) => {
    // Update the URL with the new page parameter
    const newQueryParams = new URLSearchParams(location.search);
    newQueryParams.set('page', page);
    navigate({ search: newQueryParams.toString() });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load drivers. Please try again later.
      </div>
    );
  }

  const drivers = data?.data || [];
  const paginationMeta = data?.meta || {};

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
          {drivers.length > 0 ? (
            [...drivers]?.reverse()?.map((driver, i) => (
              <DriverManagementTableBody
                key={driver._id}
                driver={driver}
                list={i + 1 + ((pageParam - 1) * 10)}
              />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No drivers found
            </div>
          )}
        </div>

        {/* Pagination section */}
        {paginationMeta.totalPage > 1 && (
          <div className="flex justify-center mt-4">
            <Pagination
              current={paginationMeta.page}
              total={paginationMeta.total}
              pageSize={paginationMeta.limit}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} drivers`}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default DriverManagementTableHead;