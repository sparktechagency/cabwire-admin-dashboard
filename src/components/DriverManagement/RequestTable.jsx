import { ArrowLeft } from 'lucide-react';
import RequestTableHead from "./RequestTableHead";


const columns = [
  "SL",
  "Driver Name",
  "Email",
  "Phone Number",
  "Car Make",
  "Car Model",
  "License Number",
  "Status",
];

const RequestTable = () => {

  return (
    <div className="w-full pt-[40px] flex flex-col gap-5">
      <button
        onClick={() => window.history.back()}
        className="flex w-20 items-center p-2 bg-primary text-white rounded-lg hover:bg-blue-950 transition-all"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back
      </button>
      <div>
        <RequestTableHead columns={columns} />
      </div>
    </div>
  );
};

export default RequestTable;
