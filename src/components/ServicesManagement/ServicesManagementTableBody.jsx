import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Switch } from "antd";
import { useState } from "react";

import { useDeleteServiceMutation, useGetParticularServiceQuery, useUpdateServiceStatusMutation } from '../../features/service/serviceApi';
import { baseURL } from '../../utils/BaseURL';
import ServicesManagementModal from "./ServicesManagementModal";
import ServicesViewDetailsModal from "./ServicesViewDetailsModal";

const ServicesManagementTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewdetailsModalVisible, setViewdetailsModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);

  const [deleteService] = useDeleteServiceMutation();
  const [updateStatus] = useUpdateServiceStatusMutation();
  const { data: serviceDetails } = useGetParticularServiceQuery(item.id, {
    skip: !viewdetailsModalVisible,
  });

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleViewDetails = () => {
    setViewdetailsModalVisible(true);
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteService(item.id).unwrap();
      setRemoveModalVisible(false);
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handleConfirmSwitch = async () => {
    try {
      const newStatus = item.status === 'active' ? 'block' : 'active';
      const response = await updateStatus({ id: item._id, status: newStatus }).unwrap();

      console.log(response)


      setSwitchModalVisible(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <>
      {/* Table Row */}
      <div className={`grid items-center grid-cols-6 gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>

        <div className="flex items-center justify-center py-3">
          {item.image ? (
            <img
              src={`${baseURL}${item.image}`}
              alt={item.serviceName || item.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center py-3">{item.serviceName}</div>
        <div className="flex items-center justify-center py-3">${item.baseFare}</div>
        <div className="flex items-center justify-center py-3">{item.status}</div>

        {/* Actions Column */}
        <div className="flex items-center justify-center py-3 ">
          <div className="flex items-center border border-primary rounded max-w-fit px-2">
            <Button
              type="text"
              icon={<EyeOutlined style={{ fontSize: "16px" }} />}
              className="text-primary "
              onClick={handleViewDetails}
            />
            <Button
              type="text"
              icon={<EditOutlined style={{ fontSize: "16px" }} />}
              className="text-orange-500 hover:text-orange-600"
              onClick={handleEdit}
            />
            {/* <Button
              type="text"
              icon={<DeleteOutlined style={{ fontSize: "16px" }} />}
              className="text-red-500 hover:text-red-600"
              onClick={handleDelete}
            /> */}
            <Switch
              checked={item.status === 'Active'}
              size="small"
              className="ml-2"
              onChange={handleSwitchChange}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={removeModalVisible}
        onCancel={() => setRemoveModalVisible(false)}
        footer={null}
        closable={false}
        width={350}
        centered
      >
        <div className="text-center py-4">
          <p className="text-base font-medium text-primary mb-6">Are you sure you want to delete this service?</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRemoveModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmDelete}
              className="px-8 bg-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

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
            {`Do you want to ${item.status === 'Active' ? 'deactivate' : 'activate'} this service?`}
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

      {/* View Details Modal */}
      {serviceDetails && (
        <ServicesViewDetailsModal
          isOpen={viewdetailsModalVisible}
          onClose={() => setViewdetailsModalVisible(false)}
          modalTitle="Service Details"
          details={[
            { label: "Service Name", value: serviceDetails.name },
            { label: "Base Price", value: `$${serviceDetails.baseFare}` },
            { label: "Rate Per Km", value: `$${serviceDetails.ratePerKm}` },
            { label: "Status", value: serviceDetails.status },
          ]}
        />
      )}

      {/* Edit Modal */}
      <ServicesManagementModal
        mode="edit"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        initialValues={{
          id: item._id,
          name: item.serviceName,
          baseFare: item.baseFare,
          image: item.image
        }}
      />
    </>
  );
};

export default ServicesManagementTableBody;