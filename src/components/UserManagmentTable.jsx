import React, { useEffect, useState } from "react";
import UserManagementTableRow from "./UserManagementTableRow";
import { useGetUserManagementQuery } from "../features/userManagement/userManagementApi";
import CustomLoading from "./CustomLoading";
import { useLocation, useNavigate } from "react-router-dom";


const userdata = [
  {
    name: "John",
    status: "Active",
    email: "example@email.com",
    location: "Demo Location",
    phone: "12345-678901",
    join: "01-02-2025",
    boking: "no",
  },
  {
    name: "John",
    status: "Active",
    email: "example@email.com",
    location: "Demo Location",
    phone: "12345-678901",
    join: "01-02-2025",
    boking: "no",
  },
  {
    name: "John",
    status: "Active",
    email: "example@email.com",
    location: "Demo Location",
    phone: "12345-678901",
    join: "01-02-2025",
    boking: "no",
  },
  {
    name: "John",
    status: "Active",
    email: "example@email.com",
    location: "Demo Location",
    phone: "12345-678901",
    join: "01-02-2025",
    boking: "no",
  }
]

const Table = ({ columns }) => {
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
              <UserManagementTableRow item={item} key={i} list={i + 1} />
            ))
          }

        </div>


      </section>
    </main>
  );
};

export default Table;
