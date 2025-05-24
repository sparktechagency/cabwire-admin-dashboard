import RecentDriverJoinTableHead from "./RecentDriverJoinTableHead";


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

const RecentDriverJoin = () => {
  return (
    <section className="">
      <RecentDriverJoinTableHead columns={columns} />
    </section>
  );
};

export default RecentDriverJoin;
