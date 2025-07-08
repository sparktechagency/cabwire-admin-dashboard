import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import { useState } from "react";
import { useDriverApproveMutation, useDriverRejectMutation } from '../../features/requestDriver/requestApi';

const RequestTableBody = ({ item, list, refetch }) => {
  const [userDetailsModalVisible, setUserDetailsModalVisible] = useState(false);
  const [ApproveRequest, { isLoading: ApproveLoading }] = useDriverApproveMutation();
  const [RejectRequest, { isLoading: RejectLoading }] = useDriverRejectMutation();


  const driver = item.driverData;

  const handleViewDetails = () => {
    setUserDetailsModalVisible(true);
  };

  const handleAprove = async (id) => {
    try {
      const response = await ApproveRequest({
        id,
        body: { action: "approve" }
      }).unwrap();

      if(response.success) {
        message.success(response?.message || "Driver approved successfully");
        refetch();
      }
    } catch (error) {
      message.error(error?.data?.message || "Failed to approve driver");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await RejectRequest({
        id,
        body: { action: "reject" }
      }).unwrap();

      if (response.success) {
        message.success(response?.message || "Driver rejected successfully")
        refetch();
      }
    } catch (error) {
      message.error(error?.data?.message || "Failed to reject driver");
    }
  }


  return (
    <>
      <div className="grid grid-cols-10 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="py-3 text-center">{list}</div>
        <div className="px-3 py-3 text-center">{item.driverName}</div>
        <div className="px-3 py-3 text-center">{item.email}</div>
        <div className="px-4 py-3 text-center">{item.phone}</div>
        <div className="px-4 py-3 text-center">{item.carMake}</div>
        <div className="px-4 py-3 text-center">{item.carModel}</div>
        <div className="py-3 text-center">{item.licenseNumber}</div>
        <div className="py-3 text-center">
          <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'active' ? 'bg-green-100 text-green-800' :
            item.status === 'block' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
            {item.status}
          </span>
        </div>
        <div className="flex items-center col-span-2 justify-between gap-2 border rounded border-primary py-1 px-2">
          <button
            className="bg-orange-500 px-2.5 py-2 w-full rounded text-xs text-white hover:bg-orange-600 transition-colors"
            onClick={handleViewDetails}
          >
            View Details
          </button>
          <button
            className="bg-primary px-2.5 py-2 w-full rounded text-xs text-white transition-colors"
            onClick={() => handleAprove(item.id)}
            disabled={ApproveLoading}
          >
            {ApproveLoading ? 'Processing...' : 'Approve'}
          </button>
          <button
            className="bg-red-500 px-2.5 py-2 w-full rounded text-xs text-white hover:bg-red-600 transition-colors"
            onClick={() => handleReject(item.id)}
            disabled={RejectLoading}
          >
            {RejectLoading ? 'Processing...' : 'Reject'}
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
                  src={driver.image || "https://i.ibb.co/z5YHLV9/profile.png"}
                  alt="Driver Photo"
                  className="w-52 h-52 object-cover rounded-full border-4 border-gray-200"
                />
              </div>

              {/* Vehicle Photo */}
              <div className="">
                <img
                  src={driver.driverVehicles?.vehiclesPicture || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop"}
                  alt="Vehicle"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>

              {/* License Photo */}
              <div>
                <img
                  src={driver.driverLicense?.uploadDriversLicense || "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop"}
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
                    <span className="text-gray-600">{driver.name}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Email:</span>
                    <span className="text-gray-600">{driver.email}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Phone Number:</span>
                    <span className="text-gray-600">{driver.phoneNumber || "N/A"}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Driver License Number:</span>
                    <span className="text-gray-600">{driver.driverLicense?.licenseNumber || "N/A"}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">License Expiry Date:</span>
                    <span className="text-gray-600">
                      {driver.driverLicense?.licenseExpiryDate ?
                        new Date(driver.driverLicense.licenseExpiryDate).toLocaleDateString() : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Make:</span>
                    <span className="text-gray-600">{driver.driverVehicles?.vehiclesMake || "N/A"}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Model:</span>
                    <span className="text-gray-600">{driver.driverVehicles?.vehiclesModel || "N/A"}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Year:</span>
                    <span className="text-gray-600">
                      {driver.driverVehicles?.vehiclesYear ?
                        new Date(driver.driverVehicles.vehiclesYear).getFullYear() : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Insurance Number:</span>
                    <span className="text-gray-600">{driver.driverVehicles?.vehiclesInsuranceNumber || "N/A"}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Registration Number:</span>
                    <span className="text-gray-600">{driver.driverVehicles?.vehiclesRegistrationNumber || "N/A"}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Total Earn:</span>
                    <span className="text-gray-600">${driver.driverTotalEarn || 0}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Total Trips:</span>
                    <span className="text-gray-600">{driver.totalTrip || 0}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Admin Revenue:</span>
                    <span className="text-gray-600">${driver.adminRevenue || 0}</span>
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