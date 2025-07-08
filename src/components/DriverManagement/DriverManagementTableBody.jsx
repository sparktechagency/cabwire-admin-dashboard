import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, message, Modal, Switch } from "antd";
import { useState } from "react";
import { useUpdateDriverStatusMutation } from "../../features/DriverManagement/driverManagement";

const DriverManagementTableBody = ({ driver, list }) => {
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(driver.status); // Add local state
  const [updateDriverStatus, { isLoading }] = useUpdateDriverStatusMutation();

  const handleViewDetails = () => setDetailsModalVisible(true);

  const handleSwitchChange = () => setSwitchModalVisible(true);

  const handleConfirmSwitch = async () => {
    try {
      const newStatus = currentStatus === 'active' ? 'block' : 'active';
      await updateDriverStatus({
        id: driver._id,
        status: newStatus
      }).unwrap();

      // Update local state immediately
      setCurrentStatus(newStatus);

      message.success(`Driver status updated to ${newStatus}`);
      setSwitchModalVisible(false);
    } catch (err) {
      message.error('Failed to update driver status');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <>
      {/* Table Row */}
      <div className="grid grid-cols-9 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="py-3 text-center">{list}</div>
        <div className="px-3 py-3 text-center">{driver?.name}</div>
        <div className="px-3 py-3 text-center">{driver.email}</div>
        <div className="px-4 py-3 text-center">{driver.contact || 'N/A'}</div>
        <div className="px-4 py-3 text-center">{driver?.driverVehicles?.vehiclesMake || 'N/A'}</div>
        <div className="px-4 py-3 text-center">{driver?.driverTotalEarn || 'N/A'}</div>
        <div className="px-4 py-3 text-center">{driver?.driverLicense?.licenseNumber || 'N/A'}</div>
        <div className={`py-3 text-center capitalize ${currentStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>
          {currentStatus}
        </div>
        <div className="flex items-center justify-between gap-2 border rounded border-primary px-5 ml-6 mr-6">
          <Button
            type="text"
            icon={<EyeOutlined style={{ fontSize: '18px' }} />}
            className="text-primary hover:text-orange-600 w-32"
            onClick={handleViewDetails}
          />
          <Switch
            checked={currentStatus === 'active'}
            size="small"
            className="ml-2"
            onChange={handleSwitchChange}
          />
        </div>
      </div>

      {/* Status Change Modal */}
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
            {currentStatus === 'active'
              ? 'Do you want to block this driver?'
              : 'Do you want to unblock this driver?'}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setSwitchModalVisible(false)}
              className="px-8 border-primary text-primary hover:bg-gray-100"
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmSwitch}
              loading={isLoading}
              className="px-8 bg-primary border-primary hover:bg-primary-dark"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Driver Details Modal */}
      <Modal
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={null}
        closable={false}
        width={900}
        centered
        className="driver-details-modal"
      >
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Driver Details</h2>
            <Button
              type="text"
              icon={<CloseOutlined />}
              className="text-orange-500 hover:text-orange-600 text-lg"
              onClick={() => setDetailsModalVisible(false)}
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
              <Avatar
                size={200}
                src={driver.image || "https://i.ibb.co/z5YHLV9/profile.png"}
                className="border-4 border-gray-200"
              />

              {driver.driverVehicles?.vehiclesPicture && (
                <img
                  src={driver.driverVehicles.vehiclesPicture}
                  alt="Vehicle"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              )}

              {driver.driverLicense?.uploadDriversLicense && (
                <img
                  src={driver.driverLicense.uploadDriversLicense}
                  alt="Driver License"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
              )}
            </div>

            {/* Right Column - Information */}
            <div className="flex-1">
              <div className="border-2 border-primary rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Driver Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="font-medium w-48">Name:</span>
                    <span className="text-gray-600">{driver?.name}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Status:</span>
                    <span className={`capitalize ${currentStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {currentStatus}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Email:</span>
                    <span className="text-gray-600">{driver.email}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Phone:</span>
                    <span className="text-gray-600">{driver.phone || 'N/A'}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Joined Date:</span>
                    <span className="text-gray-600">{formatDate(driver.createdAt)}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">License Number:</span>
                    <span className="text-gray-600">
                      {driver.driverLicense?.licenseNumber || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">License Expiry:</span>
                    <span className="text-gray-600">
                      {formatDate(driver.driverLicense?.licenseExpiryDate)}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicle Make:</span>
                    <span className="text-gray-600">
                      {driver.driverVehicles?.vehiclesMake || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicle Model:</span>
                    <span className="text-gray-600">
                      {driver.driverVehicles?.vehiclesModel || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicle Year:</span>
                    <span className="text-gray-600">
                      {driver.driverVehicles?.vehiclesYear
                        ? new Date(driver.driverVehicles.vehiclesYear).getFullYear()
                        : 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Vehicle Category:</span>
                    <span className="text-gray-600">
                      {driver.driverVehicles?.vehiclesCategory || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Registration No:</span>
                    <span className="text-gray-600">
                      {driver.driverVehicles?.vehiclesRegistrationNumber || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Insurance No:</span>
                    <span className="text-gray-600">
                      {driver.driverVehicles?.vehiclesInsuranceNumber || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Online Status:</span>
                    <span className="text-gray-600">
                      {driver.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-medium w-48">Verified:</span>
                    <span className="text-gray-600">
                      {driver.verified ? 'Yes' : 'No'}
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