import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, Switch, message } from "antd";
import { useState } from "react";
import { useUpdateUserStatusMutation } from '../features/userManagement/userManagementApi';

const UserManagementTableRow = ({ user, list }) => {
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [userDetailsModalVisible, setUserDetailsModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(user.status); // Add local state
  const [updateUserStatus , {isLoading}] = useUpdateUserStatusMutation();

  const handleViewDetails = () => {
    setUserDetailsModalVisible(true);
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  const handleConfirmSwitch = async () => {
    try {
      const newStatus = currentStatus === 'active' ? 'block' : 'active';
      const response = await updateUserStatus({
        id: user._id,
        status: newStatus
      }).unwrap();

      console.log(response);

      // Update local state immediately
      setCurrentStatus(newStatus);

      message.success(`User status updated to ${newStatus}`);
      setSwitchModalVisible(false);
    } catch (err) {
      message.error('Failed to update user status');
    }
  };

  // Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="grid grid-cols-9 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="py-3 text-center">{list}</div>
        <div className="px-3 py-3 text-center">{user?.name}</div>
        <div className="px-3 py-3 text-center">{user.email}</div>
        <div className="px-4 py-3 text-center">
          {user.geoLocation?.coordinates?.join(', ') || 'N/A'}
        </div>
        <div className="px-4 py-3 text-center">{user.phone || 'N/A'}</div>
        <div className="px-4 py-3 text-center">{formatDate(user.createdAt)}</div>
        <div className="py-3 text-center">{"N/A"}</div> {/* Booking info */}
        <div className="py-3 text-center capitalize">{currentStatus}</div>
        <div className="flex items-center justify-between gap-2 border rounded border-primary px-5 ml-6 mr-6">
          <Button
            type="text"
            icon={<EyeOutlined style={{ fontSize: '18px' }} />}
            className="text-primary hover:text-primary w-32"
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
            {currentStatus === 'active'
              ? 'Do you want to block this account?'
              : 'Do you want to unblock this account?'}
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
              loading={isLoading}
              className="px-8 bg-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      {/* User Details Modal */}
      <Modal
        open={userDetailsModalVisible}
        onCancel={() => setUserDetailsModalVisible(false)}
        footer={null}
        closable={false}
        width={500}
        centered
        className="user-details-modal"
      >
        <div className="relative">
          {/* Custom Close Button */}
          <Button
            type="text"
            icon={<CloseOutlined />}
            className="absolute top-0 right-0 text-orange-500 hover:text-orange-600 text-lg"
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

          {/* Modal Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
          </div>

          {/* User Details */}
          <div className="border border-primary p-6 rounded-lg">
            <div className="flex justify-center mb-6">
              <Avatar
                size={180}
                src={user.image || "https://i.ibb.co/z5YHLV9/profile.png"}
                className="border-4 border-gray-200"
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Name:</span>
                <span className="">{user?.name}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Status:</span>
                <span className="capitalize">{currentStatus}</span>
              </div>

              <div className="flex gap-1 items-center py-2 ">
                <span className="font-medium">Phone Number: </span>
                <span className="">{user?.phone || 'N/A'}</span>
              </div>

              <div className="flex items-center py-2 gap-1">
                <span className="font-medium ">Email: </span>
                <span className="">{user?.email}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium ">Joined:</span>
                <span className="">{formatDate(user.createdAt)}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Verified:</span>
                <span className="">{user.verified ? 'Yes' : 'No'}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Total Trip:</span>
                <span className="">N/A</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Total Amount Spend:</span>
                <span className="">N/A</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserManagementTableRow;