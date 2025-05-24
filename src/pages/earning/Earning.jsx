import EarningTable from "../../components/EarningTable";



const columns = [
  "Trip ID",
  "Driver Name",
  "User Name",
  "Car Make",
  "License Number",
  "Distance",
  "Travel Time",
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
