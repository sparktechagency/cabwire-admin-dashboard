import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllUserQuery } from "../features/dashboard/UserApi";
import UserManagementTableRow from "./UserManagementTableRow";

const Table = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get("page")) || 1;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('search');

  console.log(searchValue) // Access the search value

  const { data, isLoading, isError } = useGetAllUserQuery(pageParam);

  const handlePageChange = (newPage) => {
    navigate(`?page=${newPage}`);
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
      <div className="flex justify-center items-center h-64 text-red-500">
        Error loading user data. Please try again later.
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const transformUserData = (apiData) => {
    return apiData.map((user) => ({
      name: user.name,
      status: user.status === "active" ? "Active" : "Blocked", // Ensure this matches your API
      email: user.email,
      location: user.geoLocation ? `${user.geoLocation.coordinates[1]}, ${user.geoLocation.coordinates[0]}` : 'N/A',
      phone: 'N/A',
      join: formatDate(user.createdAt),
      boking: user.driverLicense ? 'yes' : 'no',
      id: user._id,
      rawData: user
    }));
  };

  const users = data?.data ? transformUserData(data.data) : [];
  const { meta } = data || {};
  const { page = 1, totalPage = 1 } = meta || {};

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
          {users.length > 0 ? (
            users.map((item, i) => (
              <UserManagementTableRow
                item={item}
                key={item.id}
                list={(pageParam - 1) * 10 + i + 1}
              />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No users found
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="flex justify-center items-center space-x-2 py-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className={`px-4 py-2 rounded-md ${page <= 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary text-white'}`}
            >
              Previous
            </button>

            {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-md ${page === pageNum ? 'bg-primary text-white' : 'bg-gray-200'}`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPage}
              className={`px-4 py-2 rounded-md ${page >= totalPage ? 'bg-gray-200 cursor-not-allowed' : 'bg-primary text-white'}`}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Table;