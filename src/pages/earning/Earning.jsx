import EarningTable from "../../components/EarningTable";



const columns = [
  "Driver Name",
  "User Name",
  "Car Make",
  "License Number",
  "Payment By",
  "Amount",
  "Transaction ID",
  "status"
];

const Earning = () => {

  return (
    <section className="mt-10">
      <EarningTable columns={columns} />
    </section>
  );
};

export default Earning;
