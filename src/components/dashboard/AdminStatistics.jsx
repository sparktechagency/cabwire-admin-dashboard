"use client";

import { Spin } from "antd";
import { useTotalDriverCountQuery, useTotalEarningQuery, useTotalUserCountQuery } from "../../features/dashboard/dashboardApi";

const AdminStatistics = () => {
  const { data: earning, isLoading: isLoadingEarning } = useTotalEarningQuery();
  const { data: driver, isLoading: isLoadingDriver } = useTotalDriverCountQuery();
  const { data: user, isLoading: isLoadingUser } = useTotalUserCountQuery();


  return (
    <div className="border h-[405px] flex flex-col justify-center border-primary rounded-lg p-3">
      <div className="w-full rounded-xl flex flex-col  gap-6">

        <div className="flex  justify-between items-center">
          <h2 className="text-2xl font-semibold">Statistics</h2>
          <h3 className='border border-primary px-2 py-1.5 select-none rounded'>Last 7 Days</h3>
        </div>
        <Spin tip="Loading..." spinning={isLoadingEarning || isLoadingDriver || isLoadingUser} size="small">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="border border-primary w-full rounded-xl p-4 ">
                <div className=" font-medium text-2xl mb-2">Total Earn</div>
                <div className="text-xl font-bold text-gray-800">${earning?.data.totalAmount}</div>
              </div>

              <div className="border border-primary w-full rounded-xl p-4 ">
                <div className=" font-medium text-2xl mb-2">Total Driver</div>
                <div className="text-xl font-bold text-gray-800">{driver?.data}</div>
              </div>
            </div>

            <div className="border border-primary rounded-xl p-4 ">
              <div className=" font-medium text-2xl mb-2">Total User</div>
              <div className="text-xl font-bold text-gray-800">{user?.data}</div>
            </div>
          </div>
        </Spin>

      </div>
    </div>
  );
};

export default AdminStatistics;