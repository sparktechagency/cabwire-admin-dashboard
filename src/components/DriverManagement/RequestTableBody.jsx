import { useState } from "react";
import { Button, Modal, Switch, Avatar } from "antd";
import { EditOutlined, EyeOutlined, CloseOutlined } from "@ant-design/icons";

const RequestTableBody = ({ item, list }) => {
  const [userDetailsModalVisible, setUserDetailsModalVisible] = useState(false);


  const handleViewDetails = () => {
    setUserDetailsModalVisible(true);
  };


  // Mock data for demonstration
  const mockItem = {
    driverName: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    carMake: "Toyota",
    totalEarn: "$2,500",
    adminRevenue: "$500",
    status: "Active"
  };

  const currentItem = item || mockItem;

  return (
    <>
      <div className="grid grid-cols-10 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="py-3 text-center">{list || 1}</div>
        <div className="px-3 py-3 text-center">{currentItem?.driverName}</div>
        <div className="px-3 py-3 text-center">{currentItem.email}</div>
        <div className="px-4 py-3 text-center">{currentItem.phone}</div>
        <div className="px-4 py-3 text-center">{currentItem.carMake}</div>
        <div className="px-4 py-3 text-center">{currentItem?.carModel}</div>
        <div className="py-3 text-center">{currentItem?.licenseNumber}</div>
        <div className="py-3 text-center">{currentItem?.status}</div>
        <div className="flex items-center col-span-2 justify-between gap-2 border rounded border-primary py-1 px-2">
          <button 
            className="bg-orange-500 px-2.5 py-2 w-full rounded text-xs text-white hover:bg-orange-600 transition-colors"
            onClick={handleViewDetails}
          >
            View Details
          </button>
          <button className="bg-primary px-2.5 py-2 w-full rounded text-xs text-white transition-colors">
            Approve
          </button>
          <button className="bg-red-500 px-2.5 py-2 w-full rounded text-xs text-white hover:bg-red-600 transition-colors">
            Reject
          </button>
        </div>
      </div>

     

      {/* Driver Information Modal */}
      <Modal
        open={userDetailsModalVisible}
        onCancel={() => setUserDetailsModalVisible(false)}
        footer={null}
        closable={false}
        width={900}
        centered
        className="driver-details-modal"
      >
        <div className="relative p-6">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Driver Information</h2>
            <Button
              type="text"
              icon={<CloseOutlined />}
              className="text-orange-500 hover:text-orange-600 text-lg"
              onClick={() => setUserDetailsModalVisible(false)}
              style={{ 
                border: '2px solid #f97316',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </div>

          <div className="flex gap-6">
            {/* Left Column - Images */}
            <div className="flex flex-col gap-4 justify-center items-center w-80">
              {/* Driver Photo */}
              <div className="">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="Driver Photo"
                  className="w-52 h-52 object-cover rounded-full border-4 border-gray-200"
                />
              </div>

              {/* Vehicle Photo */}
              <div className="">
                <img
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop"
                  alt="Vehicle"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>

              {/* License Photo */}
              <div>
                <img
                  src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop"
                  alt="Driver License"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="flex-1">
              <div className="border-2 border-blue-500 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Driver Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="font-medium w-48">Name:</span>
                    <span className="text-gray-600">Sabbir Ahmed</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Phone Number:</span>
                    <span className="text-gray-600">+123456574962</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Email:</span>
                    <span className="text-gray-600">example@gmail.com</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Date Of Birth:</span>
                    <span className="text-gray-600">March 20, 2000</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Driver License Number:</span>
                    <span className="text-gray-600">123456789</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">License Expiry Date:</span>
                    <span className="text-gray-600">March 20, 2027</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Make:</span>
                    <span className="text-gray-600">BMW</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium  w-48">Vehicles Model:</span>
                    <span className="text-gray-600">X1SUV</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Year:</span>
                    <span className="text-gray-600">2023</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Insurance Number:</span>
                    <span className="text-gray-600">123456789</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Registration Number:</span>
                    <span className="text-gray-600">123456789</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Total Earn:</span>
                    <span className="text-gray-600">$50,000</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Online Payment Connected:</span>
                    <span className="text-gray-600">Yes</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Admin Revenue:</span>
                    <span className="text-gray-600">$3000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RequestTableBody;