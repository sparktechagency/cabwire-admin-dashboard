import RecentUserJoinTableHead from "./RecentUserJoinTableHead";


const columns = [
  "SL",
  "userName",
  "Email",
  "Phone Number",
  "Joining Date",
  "booking",
  "Status",
];

const RecentUserJoin = () => {
  return (
    <section className="">
      <RecentUserJoinTableHead columns={columns} />
    </section>
  );
};

export default RecentUserJoin;
