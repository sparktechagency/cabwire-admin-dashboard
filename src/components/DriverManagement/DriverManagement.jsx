import { Button } from "antd";
import { Link } from "react-router-dom";
import { useGetDriverRequestCountQuery } from '../../features/requestDriver/requestApi';
import DriverManagementTable from './DriverManagementTableHead';


const columns = [
  "SL",
  "Driver Name",
  "Email",
  "Phone Number",
  "Car Make",
  "Total Earn",
  "Admin Revenue",
  "Status",
  "Action",
];

const DriverManagement = () => {
  const { data, isLoading } = useGetDriverRequestCountQuery();

  return (
    <div className="w-full flex flex-col gap-3 pt-[40px]">
      <div className="flex justify-end">
        <Link to="/driver-management/request"> <Button loading={isLoading} type="primary">Request ({data?.data?.count})</Button></Link>
      </div>
      <div>
        <DriverManagementTable columns={columns} />
      </div>
    </div>
  );
};

export default DriverManagement;
