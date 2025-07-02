import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserManagementQuery } from '../features/userManagement/userManagementApi';
import UserManagementTableRow from "./UserManagementTableRow";

const Table = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get("page")) || 1;

  const { data, isLoading } = useGetUserManagementQuery(pageParam);
  const users = data?.data || [];

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
          {users?.map((user, i) => (
            <UserManagementTableRow
              key={user._id}
              user={user}
              list={i + 1 + ((pageParam - 1) * 10)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Table;