import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, message, Modal, Switch } from "antd";
import { useState } from "react";
import { useDriverBlockMutation } from "../../features/dashboard/driverApi";

const DriverManagementTableBody = ({ item, list, refetch }) => {
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [userDetailsModalVisible, setUserDetailsModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item?.status === "active");

  const [driverBlock] = useDriverBlockMutation();

  const handleViewDetails = () => {
    setUserDetailsModalVisible(true);
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  const handleConfirmSwitch = async () => {
    try {
      const newStatus = switchStatus ? "block" : "active";
      await driverBlock({
        id: item._id,
        data: { status: newStatus }
      }).unwrap();
      refetch();

      setSwitchStatus(!switchStatus);
      message.success(`Driver ${newStatus === "active" ? "activated" : "blocked"} successfully`);
    } catch (err) {
      message.error("Failed to update driver status");
    } finally {
      setSwitchModalVisible(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-9 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="py-3 text-center">{list}</div>
        <div className="px-3 py-3 text-center">{item?.name}</div>
        <div className="px-3 py-3 text-center">{item.email}</div>
        <div className="px-4 py-3 text-center">N/A</div>
        <div className="px-4 py-3 text-center">{item?.driverVehicles?.vehiclesMake || "N/A"}</div>
        <div className="px-4 py-3 text-center">N/A</div>
        <div className="py-3 text-center">N/A</div>
        <div className="py-3 text-center">
          <span className={`px-2 py-1 rounded-full text-xs ${item?.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
            {item?.status || "N/A"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 border rounded border-orange-500 px-5 ml-6 mr-6">
          <Button
            type="text"
            icon={<EyeOutlined style={{ fontSize: '18px' }} />}
            className="text-primary hover:text-orange-600 w-32"
            onClick={handleViewDetails}
          />
          <Switch
            checked={switchStatus}
            size="small"
            className="ml-2"
            onChange={handleSwitchChange}
          />
        </div>
      </div>

      {/* Switch Confirmation Modal */}
      <Modal
        open={switchModalVisible}
        onCancel={() => setSwitchModalVisible(false)}
        footer={null}
        closable={false}
        width={350}
        centered
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium mb-6">
            {switchStatus ? "Do you want to block this account?" : "Do you want to activate this account?"}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setSwitchModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmSwitch}
              className="px-8 bg-primary border-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

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
                <Avatar
                  src={item.image}
                  alt="Driver Photo"
                  size={200}
                  className="border-4 border-gray-200"
                />
              </div>

              {/* Vehicle Photo */}
              <div className="">
                <img
                  src={item?.driverVehicles?.vehiclesPicture || "https://via.placeholder.com/300x200"}
                  alt="Vehicle"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>

              {/* License Photo */}
              <div>
                <img
                  src={item?.driverLicense?.uploadDriversLicense || "https://via.placeholder.com/300x200"}
                  alt="Driver License"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="flex-1">
              <div className="border-2 border-primary rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Driver Information</h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="font-medium w-48">Name:</span>
                    <span className="text-gray-600">{item.name}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Email:</span>
                    <span className="text-gray-600">{item.email}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Status:</span>
                    <span className="text-gray-600 capitalize">{item.status || "N/A"}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Online Status:</span>
                    <span className="text-gray-600">
                      {item.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Driver License Number:</span>
                    <span className="text-gray-600">
                      {item?.driverLicense?.licenseNumber || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">License Expiry Date:</span>
                    <span className="text-gray-600">
                      {item?.driverLicense?.licenseExpiryDate
                        ? new Date(item.driverLicense.licenseExpiryDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Make:</span>
                    <span className="text-gray-600">
                      {item?.driverVehicles?.vehiclesMake || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Model:</span>
                    <span className="text-gray-600">
                      {item?.driverVehicles?.vehiclesModel || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Year:</span>
                    <span className="text-gray-600">
                      {item?.driverVehicles?.vehiclesYear
                        ? new Date(item.driverVehicles.vehiclesYear).getFullYear()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Insurance Number:</span>
                    <span className="text-gray-600">
                      {item?.driverVehicles?.vehiclesInsuranceNumber || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicles Registration Number:</span>
                    <span className="text-gray-600">
                      {item?.driverVehicles?.vehiclesRegistrationNumber || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Stripe Account:</span>
                    <span className="text-gray-600">
                      {item?.stripeAccountId ? "Connected" : "Not Connected"}
                    </span>
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

export default DriverManagementTableBody;