import { Button, Select } from 'antd';
import { useState } from 'react';

import ServicesManagementModal from './ServicesManagementModal';
import ServicesManagementTableHead from './ServicesManagementTableHead';





const { Option } = Select;

function ServicesManagement() {
  // State for active tab (Institution or Department)
  const [activeTab, setActiveTab] = useState('institution');



  const [departments, setDepartments] = useState([
    {
      key: '1',
      id: 1,
      institution: 'Brookwood Baptist Health',
      name: 'Spark tech',
      totalEmployee: 200,
      status: 'Active'
    },
    // Duplicate entries for demo purposes
    ...Array.from({ length: 8 }, (_, i) => ({
      key: (i + 2).toString(),
      id: i + 2,
      institution: 'Brookwood Baptist Health',
      name: 'Spark tech',
      totalEmployee: 200,
      status: 'Active'
    }))
  ]);

  // State for modals
  const [isNewDepartmentModalVisible, setIsNewDepartmentModalVisible] = useState(false);



  // Handle department creation
  const handleCreateDepartment = (values) => {
    console.log(values);
  };


  const departmentColumns = [
    "Category Name",
    "Base Fare ($)",
    "Rate per Km ($)",
    "Status",
    "Action"
  ];



  const departmentData = [
    {
      id: 1,
      institution: "Brookwood Baptist Health",
      name: "Spark tech",
      totalEmployee: 300,
      status: "Active"
    },
    {
      id: 2,
      institution: "Brookwood Baptist Health",
      name: "Spark tech",
      totalEmployee: 300,
      status: "Active"
    }
  ];

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6 flex justify-end">
        <Button
          type="primary"
          onClick={() => setIsNewDepartmentModalVisible(true)}
        >
          Add New Services
        </Button>
      </div>


      <ServicesManagementTableHead activeTab={activeTab} data={departmentData} columns={departmentColumns} />



      <ServicesManagementModal
        mode="create"
        visible={isNewDepartmentModalVisible}
        onCancel={() => setIsNewDepartmentModalVisible(false)}
        onSubmit={handleCreateDepartment}
      />
    </div>
  );
}

export default ServicesManagement;