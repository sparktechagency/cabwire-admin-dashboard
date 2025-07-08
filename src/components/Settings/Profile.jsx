import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useProfileQuery } from '../../features/profile/profileApi';
import { useGetProfileSettingsQuery, useUpdateProfileSettingsMutation } from '../../features/settings/settingApi';
import { baseURL } from '../../utils/BaseURL';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileSettingsMutation();
  const { data, isLoading, } = useGetProfileSettingsQuery();
  const { data: profiles, refetch } = useProfileQuery();

  // Initialize profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "", // Changed from phone to contact to match API
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://i.ibb.co.com/fYrFP06M/images-1.png"
  );

  // Initialize profile state when data is fetched
  useEffect(() => {
    if (data?.data) {
      setProfile({
        name: data.data.name || "",
        email: data.data.email || "",
        contact: data.data.contact || "", // Using contact field
      });

      // Set profile image - only prepend baseURL if it's not already a full URL or data URL
      const imageUrl = data.data.image
        ? data.data.image.startsWith('http') || data.data.image.startsWith('data:image')
          ? data.data.image
          : `${baseURL}${data.data.image}`
        : "https://i.ibb.co.com/fYrFP06M/images-1.png";

      setPreviewImage(imageUrl);
    }
  }, [data]);

  const handleFileChange = ({ file }) => {
    if (!isEditing) return;
    if (!file.originFileObj) return;

    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => {
      setPreviewImage(reader.result);
      setProfileImageFile(file.originFileObj);
    };
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const phonePattern = /^[0-9]{10,15}$/;

    if (!profile.contact) {
      message.error("Contact number is required");
      return;
    }

    if (!phonePattern.test(profile.contact)) {
      message.error("Please enter a valid contact number");
      return;
    }

    const formData = new FormData();

    // Add the profile data
    formData.append("name", profile.name);
    formData.append("contact", profile.contact);

    // Add image if selected
    if (profileImageFile) {
      formData.append("image", profileImageFile);
    }

    try {
      await updateProfile(formData).unwrap();


      // Refetch the user profile data to get the updated information
      refetch();

      message.success("Profile updated successfully");
      setIsEditing(false);
      setProfileImageFile(null); // Reset the file state after successful update
    } catch (error) {
      console.error("API Error:", error);
      message.error(error?.data?.message || error?.message || "Error updating profile");
    }
  };

  const handleCancel = () => {
    // Reset form to original data
    if (data?.data) {
      setProfile({
        name: data.data.name || "",
        email: data.data.email || "",
        contact: data.data.contact || "",
      });
      const imageUrl = data.data.image
        ? data.data.image.startsWith('http') || data.data.image.startsWith('data:image')
          ? data.data.image
          : `${baseURL}${data.data.image}`
        : "https://i.ibb.co.com/fYrFP06M/images-1.png";

      setPreviewImage(imageUrl);
    }
    setProfileImageFile(null);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-center pt-5">
      <div className="rounded-xl w-full max-w-[800px]">
        <div className="flex items-end justify-between space-x-4">
          <div className="flex items-center gap-3">
            <div className="w-[140px] h-[140px] rounded-full border-2 border-primary mx-auto flex flex-col items-center relative">
              <div className="w-full h-full rounded-full">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              {isEditing && (
                <div className="absolute flex items-center justify-center w-8 h-8 p-2 text-center rounded-full cursor-pointer bg-[#FF991C] bottom-1 right-5">
                  <Upload showUploadList={false} onChange={handleFileChange} accept="image/*">
                    <MdEdit className="mt-1 text-xl text-white" />
                  </Upload>
                </div>
              )}
            </div>
            <h2 className="text-4xl font-semibold text-gray-800">
              {profile.name || "User"}
            </h2>
          </div>
          <Button
            type="text"
            icon={<EditOutlined />}
            className="mt-2 border border-primary w-[150px]"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <Input
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded-lg border-primary p-2 h-[44px]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <Input
              name="email"
              type="email"
              readOnly
              value={profile.email}
              disabled
              className="border rounded-lg border-primary p-2 h-[44px] bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Contact Number</label>
            <Input
              name="contact"
              value={profile.contact}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded-lg border-primary p-2 h-[44px]"
              placeholder="Enter your contact number"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {isEditing && (
            <Button
              type="default"
              className="mt-6 w-[120px]"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            type="primary"
            loading={updateLoading}
            icon={<SaveOutlined />}
            className="mt-6 w-[200px] bg-primary"
            onClick={handleSave}
            disabled={!isEditing}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;