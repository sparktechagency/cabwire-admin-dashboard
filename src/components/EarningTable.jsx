import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetEarningQuery } from "../features/earning/earningApi";
import EarningTableRow from "./EarningTableRow";
import { DatePicker } from 'antd';

const EarningTable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(queryParams.get("page")) || 1);
  const { data: earningData, isLoading } = useGetEarningQuery(currentPage, { refetchOnFocus: true, refetchOnReconnect: true });

  const totalPages = earningData?.data?.pagination?.totalPage || 1;





  // Handle search input changes




  const data = [
    {
      id: 1,
      tripId: "#123456",
      driverName: "John",
      userName: "John",
      carMake: "BMW",
      licenseNumber: "123456789",
      distance: "10.5Km",
      travelTime: "45Min",
      paymentBy: "Online",
      amount: "$240",
      transactionId: "123456789",
      status: "Completed",
    },
    {
      id: 2,
      tripId: "#123456",
      driverName: "John",
      userName: "John",
      carMake: "BMW",
      licenseNumber: "123456789",
      distance: "10.5Km",
      travelTime: "45Min",
      paymentBy: "Online",
      amount: "$240",
      transactionId: "123456789",
      status: "Completed",
    },
    {
      id: 3,
      tripId: "#123456",
      driverName: "John",
      userName: "John",
      carMake: "BMW",
      licenseNumber: "123456789",
      distance: "10.5Km",
      travelTime: "45Min",
      paymentBy: "Online",
      amount: "$240",
      transactionId: "123456789",
      status: "Completed",
    },
    {
      id: 4,
      tripId: "#123456",
      driverName: "John",
      userName: "John",
      carMake: "BMW",
      licenseNumber: "123456789",
      distance: "10.5Km",
      travelTime: "45Min",
      paymentBy: "Online",
      amount: "$240",
      transactionId: "123456789",
      status: "Completed",
    },


  ]


  const filter = [
    { label: 'All', value: 'all' },
    { label: '7 Day Free Trial', value: 'FreeTrial' },
    { label: '1 Month', value: '1Month' },
    { label: '6 Month', value: '6Month' },
    { label: '1 Year', value: '1Year' },
  ]
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };





  return (
    <div className="overflow-x-auto">
      {/* Search input */}


      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        <div className=" flex justify-between">
          <h3 className="w-9/12"></h3>
          <DatePicker onChange={onChange} picker="month" />
        </div>

        {/* Header */}
        <div className="grid grid-cols-11 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {
            data.map((item, i) => (
              <EarningTableRow item={item} key={i} />
            ))
          }
        </div>


      </div>
    </div>
  );
};

export default EarningTable;