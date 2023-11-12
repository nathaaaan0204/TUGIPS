import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';
import { Sidebar } from '../Components/Sidebar';

export const AddUsers = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: 'Staff', // Default role
  });

  const handleAddUser = () => {
    // Perform user creation logic here
    // Add validation as needed
// Check if required fields are not empty
if (!newUser.name || !newUser.email || !newUser.username || !newUser.password) {
  alert('Please fill in all required fields');
  return;
}
    // Clear the form fields
    setNewUser({
      name: '',
      email: '',
      username: '',
      password: '',
      role: 'Staff',
    });
  };

  return (
    <Fragment>
      <Sidebar />
      <div className="ml-[20rem] p-10">
        <Typography variant="h2">Add Users</Typography>
        <div className="bg-white border rounded-xl p-10 mt-10 shadow-lg">
          <Typography className="mb-5 text-xl font-semibold ">
            User Information
          </Typography>

          <form className="flex flex-col gap-5">
          <Input
              type="text"
              id="name"
              label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              type="text"
              id="username"
              label="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />

            <Input
              type="email"
              id="email"
              label="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <Input
              type="password"
              id="password"
              label="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <Select
              label="Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <Option value="Staff">Staff</Option>
              <Option value="Admin">Admin</Option>
            </Select>
            <Button onClick={handleAddUser} className="w-fit self-end">Add User</Button>

            </form>
          </div>
        </div>
      </Fragment>
    
      
  );
};
