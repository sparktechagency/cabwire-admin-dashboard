import { DatePicker } from 'antd';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetEarningQuery } from "../features/earning/earningApi";
import EarningTableRow from "./EarningTableRow";

const EarningTable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";

  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(queryParams.get("page")) || 1);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const { data: earningData, isLoading } = useGetEarningQuery();

  if (isLoading) {
    return <div className="text-center py-4">Loading earnings data...</div>;
  }


  const onChange = (date, dateString) => {
    setSelectedMonth(date);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        <div className="flex justify-between">
          <h3 className="w-9/12"></h3>
          <DatePicker
            onChange={onChange}
            picker="month"
            placeholder="Select month"
            className="w-40"
          />
        </div>

        {/* Header */}
        <div className="grid grid-cols-11 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {earningData?.data.length > 0 ? (
            earningData?.data.map((item, i) => (
              <EarningTableRow item={item} key={i} />
            ))
          ) : (
            <div className="py-4 text-center">No earnings data found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarningTable;