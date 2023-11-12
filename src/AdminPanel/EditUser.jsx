import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { dummyUsers } from '../Utils/Data';
import { Sidebar } from '../Components/Sidebar';
import { Button, Input, Select, Typography, Card, CardBody } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';


export const EditUser = () => {
  const { userId } = useParams();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const getUserData = () => {
    const user = dummyUsers.find((user) => user.id.toString() === userId);
    return user || { name: '', username: '', email: '', password: '', role: '' };
  };

  const [userData, setUserData] = useState(getUserData());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update the user data in your data source or API
    console.log('User data updated:', userData);

    // Simulating a successful save
    setSuccessMessage('Changes saved successfully');
    // Reset the success message after a few seconds (adjust the timeout as needed)
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  useEffect(() => {
    const fetchData = () => {
      const user = getUserData();
      setUserData(user);
    };

    fetchData();
  }, [userId]);

  return (
    <Fragment>
      <Sidebar />
      <div className="ml-[20rem] p-10">
        <div class="flex justify-between">
        <Typography variant="h2">Edit User</Typography>
        {successMessage && (
              <Typography className="text-green font-bold mt-3" variant="body2">
                {successMessage}
              </Typography>
            )}
            </div>
        <Card>
          <CardBody>
            <Typography className="mb-5 text-xl font-semibold">User Information</Typography>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input type="text" name="name" value={userData.name} onChange={handleInputChange} placeholder="Name" />
              <Input type="text" name="username" value={userData.username} onChange={handleInputChange} placeholder="Username" />
              <Input type="text" name="email" value={userData.email} onChange={handleInputChange} placeholder="Email" />
              <div className="relative flex">
                <Input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? <EyeIcon className="w-6 h-6" /> : <EyeSlashIcon className="w-6 h-6" />}
                </button>
              </div>
              <Select name="role" value={userData.role} onChange={handleInputChange} placeholder="Role">
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
              </Select>
              <Button type="submit" className="w-fit self-end">
                Save Changes
              </Button>
            </form>
           
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};
