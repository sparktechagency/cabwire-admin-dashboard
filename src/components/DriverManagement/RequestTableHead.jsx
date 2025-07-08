import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDriverAllAprovedMutation, useDriverAllRejectedMutation, useGetDriverRequestQuery } from '../../features/requestDriver/requestApi';
import Pagination from '../RecentDriverJoin/Pagination';
import RequestTableBody from "./RequestTableBody";
import { message, Spin } from 'antd';

const RequestTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get("page")) || 1);
  const { data, isLoading, isFetching, refetch } = useGetDriverRequestQuery({ page: currentPage });
  const [AllAproveRequest, { isLoading: AllAproveRequestLoading }] = useDriverAllAprovedMutation();
  const [AllRejectRequest, { isLoading: AllRejectLoading }] = useDriverAllRejectedMutation();

  // Transform API data to match table format
  const transformedData = data?.data?.map(driver => ({
    id: driver._id,
    driverName: driver.name,
    email: driver.email,
    phone: driver.phoneNumber || "N/A",
    carMake: driver.driverVehicles?.vehiclesMake || "N/A",
    carModel: driver.driverVehicles?.vehiclesModel || "N/A",
    licenseNumber: driver.driverLicense?.licenseNumber || "N/A",
    status: driver.status,
    image: driver.image,
    driverData: driver // Store full driver data for modal
  })) || [];

  // Get pagination info from API
  const totalPages = data?.meta?.totalPage || 1;
  const totalItems = data?.meta?.total || 0;
  const itemsPerPage = data?.meta?.limit || 10;


  const handleAllAproved = async () => {
    try {
      const response = await AllAproveRequest({
        body: { action: "approve" }
      }).unwrap();
      if(response.success) {
        message.success(response?.message || "All drivers approved successfully");
        refetch();
      }
    } catch (error) {
      message.error(error?.data?.message || "Failed to approve all drivers");
    }
  }

  const handleAllReject = async () => {
    try {
      const response = await AllRejectRequest({
        body: { action: "reject" }
      }).unwrap();
      if(response.success) {
        message.success(response?.message || "All drivers rejected successfully");
        refetch();
      }
    } catch (error) {
      message.error(error?.data?.message || "Failed to reject all drivers");
    }
  }


  if (isLoading) {
    return <div className="text-center py-8">Loading driver requests...</div>;
  }

  return (
    <main className="overflow-x-auto">
      <section className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header section */}
        <div className="grid grid-cols-10 text-center border-2 border-opacity-50 rounded-lg justify-items-stretch bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 text-sm font-semibold">
              {column}
            </div>
          ))}
          <h3 className="py-3 col-span-2 text-sm font-semibold">Action</h3>
        </div>

        {/* Body section */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isFetching ? (
            <div className="py-8 text-center"><Spin size='small'/></div>
          ) : transformedData.length > 0 ? (
            transformedData.map((item, i) => (
              <RequestTableBody
                key={item.id}
                item={item}
                list={(currentPage - 1) * itemsPerPage + i + 1}
                refetch={refetch}
              />
            ))
          ) : (
            <div className="py-8 text-center">No driver requests found</div>
          )}
        </div>

        {/* Pagination */}
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

        {/* Bulk Actions */}
        <div className="flex items-center col-span-2 justify-end gap-2 rounded py-1 px-2">
          <button
            className="bg-red-500 px-4 py-2 rounded text-base text-white hover:bg-red-600 transition-colors"
            onClick={handleAllReject}
          >
            Reject All
          </button>
          <button
            className="bg-primary px-4 py-2 rounded text-base text-white transition-colors"
            onClick={handleAllAproved}
          >
            Approve All
          </button>
        </div>
      </section>
    </main>
  );
};

export default RequestTableHead;