import { useLocation, useNavigate } from "react-router-dom";

import { useTotalResentDriverQuery } from '../../features/dashboard/dashboardApi';
import RecentDriverJoinTableBody from "./RecentDriverJoinTableBody";

const RecentDriverJoinTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  const { data: recentDriver, isLoading } = useTotalResentDriverQuery();






  const data = [
    {
      id: 1,
      driverName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      carMake: "BMW",
      carModel: "X1 SUV",
      licenseNumber: "60",
      status: "active",
    },
    {
      id: 2,
      driverName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      carMake: "BMW",
      carModel: "X1 SUV",
      licenseNumber: "60",
      status: "active",
    },
    {
      id: 3,
      driverName: "John joe",
      email: "example@email.com",
      phoneNumber: "12345-678901",
      carMake: "BMW",
      carModel: "X1 SUV",
      licenseNumber: "60",
      status: "active",
    },

  ];


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
          {
            recentDriver?.data?.map((item, i) => (
              <RecentDriverJoinTableBody item={item} key={i} />
            ))
          }
        </div>


      </div>
    </div>
  );
};

export default RecentDriverJoinTableHead;