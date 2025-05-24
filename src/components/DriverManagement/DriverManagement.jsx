import { Button } from "antd";
import DriverManagementTableHead from "./DriverManagementTableHead";
import { Link } from "react-router-dom";


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
  return (
    <div className="w-full flex flex-col gap-3 pt-[40px]">
      <div className="flex justify-end">
        <Link to="/driver-management/request"> <Button type="primary">Request (03)</Button></Link>
      </div>
      <div>
        <DriverManagementTableHead columns={columns} />
      </div>
    </div>
  );
};

export default DriverManagement;
