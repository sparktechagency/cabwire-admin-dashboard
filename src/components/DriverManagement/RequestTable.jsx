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
    <div className="w-full pt-[40px]">
      <div>
        <RequestTableHead columns={columns} />
      </div>
    </div>
  );
};

export default RequestTable;
