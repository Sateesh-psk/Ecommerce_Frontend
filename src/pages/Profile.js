import React, { useEffect, useState } from 'react';
import url from '../components/url';

const GetUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const uname = sessionStorage.getItem('name');
      const utoken = sessionStorage.getItem('token');
      if (!uname || !utoken) {
        console.error('User details not found in session storage.');
        return;
      }

      try {
        const response = await fetch(`${url}/user/userDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ u_name: uname, u_token: utoken }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setUserDetails(data._doc);
        setFormData(data._doc); // Set initial form data
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handlePasswordChange = async () => {
    if (!newPassword) {
      alert('Please enter a new password.');
      return;
    }

    const confirm = window.confirm('Are you sure you want to change your password?');
    if (!confirm) return;

    try {
      const response = await fetch(`${url}/user/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ u_name: userDetails.u_name, new_password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password.');
      }

      alert('Password changed successfully!');
      setNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password.');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    const confirm = window.confirm('Are you sure you want to update your details?');
    if (!confirm) return;

    try {
      const response = await fetch(`${url}/user/updateDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user details.');
      }

      const updatedData = await response.json();
      alert('Details updated successfully!');
      setUserDetails(updatedData._doc);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update details.');
    }
  };

  if (!userDetails) return <div>Loading User Details...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg select-none">
      <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>

      {!isEditing ? (
        <div className="mb-6 text-lg">
          <p className="mb-2">
            <strong className="text-gray-700">Name:</strong> {userDetails.u_name}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Email:</strong> {userDetails.u_u_email}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Contact:</strong> {userDetails.u_u_contact}
          </p>
          <p className="mb-4">
            <strong className="text-gray-700">Address:</strong> {userDetails.u_addr}
          </p>
          <button
            onClick={handleEditToggle}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit Details
          </button>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              name="u_name"
              value={formData.u_name}
              onChange={handleFormChange}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="u_u_email"
              value={formData.u_u_email}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Contact:</label>
            <input
              type="text"
              name="u_u_contact"
              value={formData.u_u_contact}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Address:</label>
            <input
              type="text"
              name="u_addr"
              value={formData.u_addr}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleFormSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            onClick={handleEditToggle}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-6 flex">
        {/* <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3> */}
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-3/5 px-4 py-2 border rounded-l-md mb-4"
        />
        <button
          onClick={handlePasswordChange}
          className="bg-red-600 text-white h-10 w-2/5 rounded-r-md hover:bg-red-700"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};
export default GetUserDetails;
