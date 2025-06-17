import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, Switch, message } from "antd";
import { useState } from "react";
import { useUserBlockMutation } from "../features/dashboard/UserApi";

const UserManagementTableRow = ({ item, list }) => {
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [userDetailsModalVisible, setUserDetailsModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "Active");
  const [userBlock] = useUserBlockMutation();

  const handleViewDetails = () => {
    setUserDetailsModalVisible(true);
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  const handleConfirmSwitch = async () => {
    try {
      const newStatus = switchStatus ? "block" : "active";
      const response = await userBlock({
        id: item.id,
        data: { status: newStatus }
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to update status");
      }

      setSwitchStatus(!switchStatus);
      message.success(`User ${newStatus === "block" ? "blocked" : "activated"} successfully`);
    } catch (error) {
      message.error(error.message || "Failed to update status");
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
        <div className="px-4 py-3 text-center">{"Dhaka"}</div>
        <div className="px-4 py-3 text-center">{item.phone}</div>
        <div className="px-4 py-3 text-center">{item?.join}</div>
        <div className="py-3 text-center">{item?.boking}</div>
        <div className="py-3 text-center">{switchStatus ? "Active" : "Blocked"}</div>
        <div className="flex items-center justify-between gap-2 border rounded border-primary px-5 ml-6 mr-6">
          <Button
            type="text"
            icon={<EyeOutlined style={{ fontSize: '18px' }} />}
            className="text-primary hover:text-primary w-32"
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
            {switchStatus
              ? "Do you want to block this account?"
              : "Do you want to activate this account?"}
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

          {/* User Avatar */}
          <div className="border border-primary p-6 rounded-lg">
            <div className="flex justify-center mb-6">
              <Avatar
                size={180}
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                className="border-4 border-gray-200"
              />
            </div>

            {/* User Details */}
            <div className="space-y-4">
              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Name:</span>
                <span className="">{item?.name || 'Sabbir Ahmed'}</span>
              </div>

              <div className="flex gap-1 items-center py-2 ">
                <span className="font-medium">Phone Number: </span>
                <span className="">{item?.phone || '+123456574962'}</span>
              </div>

              <div className="flex items-center py-2 gap-1">
                <span className="font-medium ">Email: </span>
                <span className="">{item?.email || 'example@gmail.com'}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium ">Total Trip:</span>
                <span className="">{item?.boking || '5'}</span>
              </div>

              <div className="flex gap-1 items-center py-2">
                <span className="font-medium">Total Amount Spend:</span>
                <span className="">${item?.totalAmount || '5000'}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserManagementTableRow;