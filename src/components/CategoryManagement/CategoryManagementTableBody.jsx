import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Switch } from "antd";
import { useState } from "react";
import DepartmentManagementFormModal from "./DepartmentManagementFormModal";
import ViewDetailsModal from "./ViewDetailsModal";

const CategoryManagementTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewdetailsModalVisible, setViewdetailsModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "Active");

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleEdit = (value) => {
    setEditModalVisible(true);
  };

  const handleViewDetails = () => {
    setViewdetailsModalVisible(true);
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here
    setRemoveModalVisible(false);
  };

  const handleConfirmSwitch = () => {
    // Implement switch logic here
    setSwitchStatus(!switchStatus);
    setSwitchModalVisible(false);
  };

  return (
    <>
      {/* Table Row */}
      <div className={`grid items-center grid-cols-5 gap-2 px-2 my-3 text-sm bg-gray-100 space-x-5 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3">{item.institution}</div>
        <div className="flex items-center justify-center py-3">{item.name}</div>
        <div className="flex items-center justify-center py-3">{item.status}</div>
        
        {/* Fixed Actions Column */}
        <div className="flex items-center justify-center py-3 ">
          <div className="flex items-center border border-primary rounded max-w-fit px-2">
            <Button
              type="text"
              icon={<EyeOutlined style={{ fontSize: "16px" }} />}
              className="text-primary hover:text-primary"
              onClick={handleViewDetails}
            />
            <Button
              type="text"
              icon={<EditOutlined style={{ fontSize: "16px" }} />}
              className="text-orange-500 hover:text-orange-600"
              onClick={handleEdit}
            />
            <Button
              type="text"
              icon={<DeleteOutlined style={{ fontSize: "16px" }} />}
              className="text-red-500 hover:text-red-600"
              onClick={handleDelete}
            />
            <Switch
              checked={switchStatus}
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
          <p className="text-base font-medium text-primary mb-6">Do you want to Turn Off This Category</p>
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
          <p className="text-lg font-medium mb-6">Do you want to Remove This Category</p>
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


        <ViewDetailsModal isOpen={viewdetailsModalVisible} onClose={() => setViewdetailsModalVisible(false)} modalTitle="Category"
        imageAlt="Category"
        details={[
          { label: "Category Name", value: "Demo Category" },
          { label: "Base Price", value: "$548" },
          { label: "Rate Per Km ($)", value: "$45" },
        ]} />

       <DepartmentManagementFormModal mode="edit" visible={editModalVisible} onCancel={() => setEditModalVisible(false)} />
    </>
  );
};

export default CategoryManagementTableBody;