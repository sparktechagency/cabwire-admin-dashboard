import UserManagementTable from "../../components/UserManagmentTable";

const columns = [
  "SL",
  "User Name",
  "Email",
  "Location",
  "Phone Number",
  "Joining Date",
  "Booking",
  "Status",
  "Action",
];

const UserManagement = () => {
  return (
    <div className="w-full pt-[40px]">
      <div>
        <UserManagementTable columns={columns} />
      </div>
    </div>
  );
};

export default UserManagement;
