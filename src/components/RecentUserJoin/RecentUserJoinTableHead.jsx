import { useLocation, useNavigate } from "react-router-dom";

import RecentUserJoinTableBody from "./RecentUserJoinTableBody";

const RecentUserJoinTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";





  const data = [
    {
      id: 1,
      userName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      joiningDate: "01-02-2025",
      booking: "No",
      status: "active",
    },
    {
      id: 2,
      userName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      joiningDate: "01-02-2025",
      booking: "No",
      status: "active",
    },
    {
      id: 3,
      userName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      joiningDate: "01-02-2025",
      booking: "No",
      status: "active",
    },
  ]






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
          {
            data.map((item, i) => (
              <RecentUserJoinTableBody item={item} key={i} />
            ))
          }
        </div>


      </div>
    </div>
  );
};

export default RecentUserJoinTableHead;