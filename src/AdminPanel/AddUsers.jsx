import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';
import { Sidebar } from '../Components/Sidebar';
import axios from 'axios';

export const AddUsers = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState({
    strName: '',
    strEmail: '',
    strUsername: '',
    strPassword: '',
    strRole: '', // Default role
  });

  const handleAddUser = async () => {
    if (!newUser.strName || !newUser.strEmail || !newUser.strUsername || !newUser.strPassword || !newUser.strRole) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('https://localhost:44392/api/Registration/Registration', newUser);
      console.log(response.data); // Log the response data if needed

      // Clear the form fields
      setNewUser({
        strName: '',
        strEmail: '',
        strUsername: '',
        strPassword: '',
        strRole: '',
      });

      // Call the onAddUser callback if needed
      // onAddUser(response.data); // Pass the newly created user data to the parent component
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the HTTP request
    }
  };

  return (
    <Fragment>
      <Sidebar />
      <div className="ml-[20rem] p-10">
        <Typography variant="h2">Add Users</Typography>
        <div className="bg-white border rounded-xl p-10 mt-10 shadow-lg">
          <Typography className="mb-5 text-xl font-semibold ">User Information</Typography>

          <form className="flex flex-col gap-5">
            <Input
              type="text"
              id="name"
              label="Name"
              value={newUser.strName}
              onChange={(e) => setNewUser({ ...newUser, strName: e.target.value })}
            />
            <Input
              type="text"
              id="username"
              label="Username"
              value={newUser.strUsername}
              onChange={(e) => setNewUser({ ...newUser, strUsername: e.target.value })}
            />

            <Input
              type="email"
              id="email"
              label="Email"
              value={newUser.strEmail}
              onChange={(e) => setNewUser({ ...newUser, strEmail: e.target.value })}
            />

            <Input
              type="password"
              id="password"
              label="Password"
              value={newUser.strPassword}
              onChange={(e) => setNewUser({ ...newUser, strPassword: e.target.value })}
            />

            <Select
              label="Role"
              value={newUser.strRole}
              onChange={(value) => setNewUser({ ...newUser, strRole: value })}
            >
              <Option value="Staff">Staff</Option>
              <Option value="Admin">Admin</Option>
            </Select>
            <Button onClick={handleAddUser} className="w-fit self-end">
              Add User
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};