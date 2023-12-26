import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Option, Select, Typography, Card, CardBody } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { SidebarComponent } from '../Components/SidebarComponent';

export const EditUser = () => {
  const { intRegistrationId } = useParams();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({
    strName: '',
    strUsername: '',
    strEmail: '',
    strPassword: '',
    strRole: ''
  });

  const getUserData = async () => {
    try {
      const response = await axios.get(`https://localhost:44392/api/Registration/GetUser/${intRegistrationId}`);
      const { listRegistration } = response.data;
      if (listRegistration.length > 0) {
        const user = listRegistration[0];
        // Trim whitespace from strRole value
        user.strRole = user.strRole.trim();
        setUserData(user);
      } else {
        setErrorMessage('No user data found');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to fetch user data');
      setSuccessMessage('');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://localhost:44392/api/Registration/EditRegistration/${intRegistrationId}`, userData)
      .then((response) => {
        console.log('User data updated:', response.data);

        setSuccessMessage('Changes saved successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
    };

    fetchData();
  }, [intRegistrationId]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <Fragment>
      <SidebarComponent />
      <div className="lg:ml-[20rem] h-screen py-16 px-8 flex flex-col gap-10">
        <div className="flex justify-between">
          <Typography variant="h2">Edit User</Typography>
          {successMessage && (
            <Typography className="text-green font-bold mt-3" variant="body2">
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography className="text-red-500 font-bold mt-3" variant="body2">
              {errorMessage}
            </Typography>
          )}
        </div>
        <Card>
          <CardBody>
            <Typography className="mb-5 text-xl font-semibold">User Information</Typography>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="Name"
                type="text"
                name="strName"
                value={userData.strName}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <Input
                label="Username"
                type="text"
                name="strUsername"
                value={userData.strUsername}
                onChange={handleInputChange}
                placeholder="Username"
              />
              <Input
                label="Email"
                type="text"
                name="strEmail"
                value={userData.strEmail}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <div className="relative flex">
                <Input
                  label="Password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="strPassword"
                  value={userData.strPassword}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? <EyeIcon className="w-6 h-6" /> : <EyeSlashIcon className="w-6 h-6" />}
                </button>
              </div>
              <Select
                label="Select a Role"
                value={userData.strRole}
                onChange={(e) => handleInputChange({ target: { name: 'strRole', value: e.target.value } })}
                placeholder="Select a Role"
              >
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Staff">Staff</Select.Option>
              </Select>
              <Button type="submit" className="bg-green sm:w-[200px] w-full self-end">
                Save Changes
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};