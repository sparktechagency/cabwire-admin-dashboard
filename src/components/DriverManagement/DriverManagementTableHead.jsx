import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DriverManagementTableBody from "./DriverManagementTableBody";


const userdata = [
  {
    id: 1,
    driverName: "John",
    email: "example@email.com",
    phone: "12345-678901",
    carMake: "BMW",
    totalEarn: "$50,000",
    adminRevenue: "$3000",
    status: "Active",
  },
  {
    id: 2,
    driverName: "John",
    email: "example@email.com",
    phone: "12345-678901",
    carMake: "BMW",
    totalEarn: "$50,000",
    adminRevenue: "$3000",
    status: "Active",
  },
  {
    id: 3,
    driverName: "John",
    email: "example@email.com",
    phone: "12345-678901",
    carMake: "BMW",
    totalEarn: "$50,000",
    adminRevenue: "$3000",
    status: "Active",
  },
  {
    id: 4,
    driverName: "John",
    email: "example@email.com",
    phone: "12345-678901",
    carMake: "BMW",
    totalEarn: "$50,000",
    adminRevenue: "$3000",
    status: "Active",
  },
  
]

const DriverManagementTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get("page")) || 1;


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

          {
            userdata?.map((item, i) => (
              <DriverManagementTableBody item={item} key={i} list={i + 1} />
            ))
          }

        </div>


      </section>
    </main>
  );
};

export default DriverManagementTableHead;
