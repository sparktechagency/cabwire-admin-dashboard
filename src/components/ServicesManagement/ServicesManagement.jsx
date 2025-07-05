import { Button } from 'antd';
import { useState } from 'react';

import { useGetAllServicesQuery } from '../../features/service/serviceApi';
import ServicesManagementModal from './ServicesManagementModal';
import ServicesManagementTableHead from './ServicesManagementTableHead';

function ServicesManagement() {
  const [isNewServiceModalVisible, setIsNewServiceModalVisible] = useState(false);
  const { data: services = [], isLoading, isError } = useGetAllServicesQuery();


  const handleCreateService = async (values) => {
    setIsNewServiceModalVisible(false);
  };

  const departmentColumns = [
    "SL",
    "Service Picture",
    "Category Name",
    "Base Fare ($)",
    "Status",
    "Action"
  ];




  const result = [];

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6 flex justify-end">
        <Button
          type="primary"
          onClick={() => setIsNewServiceModalVisible(true)}
        >
          Add New Services
        </Button>
      </div>

      <ServicesManagementTableHead
        data={services?.data}
        columns={departmentColumns}
        loading={isLoading}
      />

      <ServicesManagementModal
        mode="create"
        visible={isNewServiceModalVisible}
        onCancel={() => setIsNewServiceModalVisible(false)}
        onSubmit={handleCreateService}
      />
    </div>
  );
}

export default ServicesManagement;