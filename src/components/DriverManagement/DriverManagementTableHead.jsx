import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllDriverQuery } from "../../features/dashboard/driverApi";
import DriverManagementTableBody from "./DriverManagementTableBody";

const DriverManagementTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get("page")) || 1;

  const { data, isLoading, refetch } = useGetAllDriverQuery(pageParam);

  const handlePageChange = (page) => {
    queryParams.set("page", page);
    navigate({ search: queryParams.toString() });
  };

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
          {isLoading ? (
            <div className="py-4 text-center">Loading...</div>
          ) : (
            data?.data?.map((item, i) => (
              <DriverManagementTableBody item={item} refetch={refetch} key={item._id} list={i + 1} />
            ))
          )}
        </div>

        {/* Pagination */}
        {data?.meta?.totalPage > 1 && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {Array.from({ length: data.meta.totalPage }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${page === pageParam
                    ? "bg-primary text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default DriverManagementTableHead;