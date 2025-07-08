import { DatePicker, Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetEarningQuery } from "../features/earning/earningApi";
import EarningTableRow from "./EarningTableRow";
import Pagination from './RecentDriverJoin/Pagination';

const EarningTable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Get query parameters or use defaults
  const searchValue = queryParams.get("search") || "";
  const page = Number(queryParams.get("page")) || 1;
  const monthParam = queryParams.get("month");
  const yearParam = queryParams.get("year");

  // State management
  const [currentPage, setCurrentPage] = useState(page);
  const [selectedDate, setSelectedDate] = useState(
    monthParam && yearParam ? dayjs(`${yearParam}-${monthParam}-01`) : null
  );

  // Extract month and year from selected date
  const month = selectedDate ? selectedDate.month() + 1 : null;
  const year = selectedDate ? selectedDate.year() : null;

  // API query with all parameters
  const { data: earningData, isLoading, isFetching } = useGetEarningQuery({
    month,
    year,
    searchTerm: searchValue,
    page: currentPage
  });

  // Handle date change
  const onChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(1); // Reset to first page when changing date
    updateUrlParams({
      month: date ? date.month() + 1 : null,
      year: date ? date.year() : null,
      page: 1
    });
  };

  // Handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateUrlParams({ page });
  };

  // Update URL parameters without page reload
  const updateUrlParams = ({ month, year, page }) => {
    const params = new URLSearchParams();
    if (month) params.set('month', month);
    if (year) params.set('year', year);
    if (searchValue) params.set('searchTerm', searchValue);
    if (page) params.set('page', page);

    navigate(`?${params.toString()}`, { replace: true });
  };

  // Sync state with URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newPage = Number(params.get("page")) || 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [location.search]);



  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        <div className="flex justify-between">
          <h3 className="w-9/12"></h3>
          <DatePicker
            onChange={onChange}
            value={selectedDate}
            picker="month"
            placeholder="Select month"
            className="w-40"
            allowClear
          />
        </div>

        {/* Header */}
        <div className="grid grid-cols-8 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {
            isLoading || isFetching ? <h3 className='flex justify-center items-center h-[200px]'><Spin size='small' /></h3> : earningData?.data?.result?.length > 0 ? (
              earningData.data.result.map((item, i) => (
                <EarningTableRow item={item} key={i} loading={isLoading} fatching={isFetching} />
              ))
            ) : (
              <div className="py-4 text-center">No earnings data found</div>
            )}

        </div>

        {/* Pagination */}
        {earningData?.data?.meta?.totalPage > 1 && (
          <div className="flex justify-end mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={earningData.data.meta.totalPage}
              onPageChange={handlePageChange}
              isLoading={isLoading || isFetching}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningTable;