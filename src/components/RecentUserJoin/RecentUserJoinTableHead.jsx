import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllRecentUserQuery } from "../../features/dashboard/UserApi";
import RecentUserJoinTableBody from "./RecentUserJoinTableBody";

const RecentUserJoinTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  const { data: RecentUser, isLoading } = useGetAllRecentUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Transform API data to match the expected format
  const transformedData = RecentUser?.data?.map(user => ({
    id: user._id,
    userName: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber || "N/A", // Add fallback if phoneNumber doesn't exist
    joiningDate: new Date(user.createdAt).toLocaleDateString('en-GB'), // Format date as DD-MM-YYYY
    booking: "No", // Assuming this needs to come from another API endpoint
    status: user.status,
  })) || [];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header */}
        <div className="grid grid-cols-7 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {transformedData.length > 0 ? (
            transformedData.map((item, i) => (
              <RecentUserJoinTableBody item={item} key={i} list={i + 1} />
            ))
          ) : (
            <div className="py-4 text-center">No recent users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentUserJoinTableHead;