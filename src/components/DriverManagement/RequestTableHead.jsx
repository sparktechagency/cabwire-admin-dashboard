import { useLocation, useNavigate } from "react-router-dom";
import RequestTableBody from "./RequestTableBody";


const userdata = [
  {
    id: 1,
    driverName: "John",
    email: "example@email.com",
    phone: "12345-678901",
    carMake: "BMW",
    carModel: "X1 SUV",
    licenseNumber : "$3000",
    status: "Active",
  },
  {
    id: 2,
    driverName: "John",
    email: "example@email.com",
    phone: "12345-678901",
    carMake: "BMW",
    totalEarn: "$50,000",
    adminRevenue: "$3000",
    status: "Active",
  },
  {
    id: 3,
    driverName: "John",
    email: "example@email.com",
    phone: "12345-678901",
    carMake: "BMW",
    totalEarn: "$50,000",
    adminRevenue: "$3000",
    status: "Active",
  },
  {
    id: 4,
    driverName: "John",
    email: "example@email.com",
    phone: "12345-678901",
    carMake: "BMW",
    totalEarn: "$50,000",
    adminRevenue: "$3000",
    status: "Active",
  },
  
]

const RequestTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get("page")) || 1;


  return (
    <main className="overflow-x-auto">
      <section className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header section */}
        <div className="grid grid-cols-10 text-center border-2 border-opacity-50 rounded-lg justify-items-stretch bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 text-sm font-semibold">
              {column}
            </div>
          ))}
          <h3 className="py-3 col-span-2 text-sm font-semibold">Action</h3>
        </div>

        {/* Body section */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">

          {
            userdata?.map((item, i) => (
              <RequestTableBody item={item} key={i} list={i + 1} />
            ))
          }

          

        </div>

        <div className="flex items-center col-span-2 justify-end gap-2 rounded py-1 px-2">
             <button className="bg-red-500 px-4 py-2 rounded text-base text-white hover:bg-red-600 transition-colors">
            Reject All
          </button>
          <button className="bg-primary px-4 py-2  rounded text-base text-white transition-colors">
            Approve All
          </button>
       
        </div>


      </section>
    </main>
  );
};

export default RequestTableHead;
