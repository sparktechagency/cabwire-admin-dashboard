import RecentUserJoinTableHead from "./RecentUserJoinTableHead";


const columns = [
  "SL",
  "UserName",
  "Email",
  "Phone Number",
  "Joining Date",
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
