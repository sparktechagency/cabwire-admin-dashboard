import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllRecentDriverQuery } from "../../features/dashboard/driverApi";
import RecentDriverJoinTableBody from "./RecentDriverJoinTableBody";

const RecentDriverJoinTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  const { data: apiData, isLoading } = useGetAllRecentDriverQuery();

  if (isLoading) {
    return <div className="text-center py-4">Loading drivers...</div>;
  }

  // Transform API data to match the expected format
  const transformedData = apiData?.data?.map(driver => ({
    id: driver._id,
    driverName: driver.name || "N/A",
    email: driver.email || "N/A",
    phoneNumber: driver.phoneNumber || "N/A",
    carMake: driver.vehicle?.make || "N/A",  // Assuming vehicle data is nested
    carModel: driver.vehicle?.model || "N/A", // Assuming vehicle data is nested
    licenseNumber: driver.licenseNumber || "N/A",
    status: driver.status || "inactive" // Default to inactive if status not provided
  })) || [];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header */}
        <div className="grid grid-cols-8 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {transformedData.length > 0 ? (
            transformedData.map((item, i) => (
              <RecentDriverJoinTableBody item={item} key={i} list={i + 1} />
            ))
          ) : (
            <div className="py-4 text-center">No recent drivers found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentDriverJoinTableHead;