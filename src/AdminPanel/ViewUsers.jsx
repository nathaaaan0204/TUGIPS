import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Input,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Sidebar } from "../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { SidebarComponent } from "../Components/SidebarComponent";
const TABLE_HEAD = ["ID", "Name", "Email", "Role", "Status", "Actions"];
const ITEMS_PER_PAGE = 10; // Number of items per page

export const ViewUsers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://localhost:44392/api/Registration/GetRegistration");
      setUsers(response.data.listRegistration);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter the rows based on the search query
  const filteredRows = users.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const displayedRows = filteredRows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };
  const handleUserApproval = async (registrationId) => {
    try {
      const response = await axios.post(`https://localhost:44392/api/Registration/UserApproval`, {
        intRegistrationId: registrationId
      });

      // Handle the response as needed after approving the user
      if (response.status === 200) {
        console.log("User Approved");

        // Find the index of the approved user in the users array
        const userIndex = users.findIndex(user => user.intRegistrationId === registrationId);

        // Update the status of the approved user in the users array
        if (userIndex !== -1) {
          const updatedUsers = [...users];
          updatedUsers[userIndex].isApproved = 1;
          setUsers(updatedUsers);
        }
      } else {
        console.log("User Approval Failed");
      }
    } catch (error) {
      // Handle the error if the user approval fails
      console.error(error);
    }
  };

  const handleUserDecline = async (registrationId) => {
    try {
      const response = await axios.post(
        "https://localhost:44392/api/Registration/DeclineUser",
        { intRegistrationId: registrationId }
      );

      // Handle the response as needed after declining the user
      console.log(response.data);

      // Find the index of the declined user in the users array
      const userIndex = users.findIndex((user) => user.intRegistrationId === registrationId);

      // Update the status of the declined user in the users array
      if (userIndex !== -1) {
        const updatedUsers = [...users];
        updatedUsers[userIndex].isApproved = 2;
        setUsers(updatedUsers);
      }
    } catch (error) {
      // Handle the error if the user decline fails
      console.error(error);
    }
  };
  const handleUserEdit = (registrationId) => {
    // Navigate to the EditUser component passing the registrationId as a route parameter
    navigate(`/EditUser/${registrationId}`);
  };

  return (
    <Fragment>
      <SidebarComponent />
      <div className="lg:ml-[20rem] h-screen py-16 px-8 flex flex-col gap-10">
        <div className="">
        <div className="flex sm:justify-between gap-5 flex-wrap justify-center">
            <Typography variant="h2">View Users</Typography>
            <Link to="/AddUsers">
              <Button className="  bg-green w-[200px]">
              Create User
              </Button>
            </Link>
          </div>
          <div className="mt-10">
            <Card className="h-full w-full overflow-scroll border">
              <div className="p-4">
                <Input
                  type="text"
                  label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={TABLE_HEAD.length} className="p-4">
                        Loading users...
                      </td>
                    </tr>
                  ) : (
                    displayedRows.map(
                      ({
                        intRegistrationId,
                        strName,
                        strEmail,
                        strRole,
                        isApproved,
                      }) => (
                        <tr key={intRegistrationId} className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {intRegistrationId}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {strName}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {strEmail}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {strRole}
                            </Typography>
                          </td>
                          <td className="p-4">
                            {isApproved === 1 ? (
                              <span className="text-green-500">Approved</span>
                            ) : IsApproved === 2 ? (
                              <span className="text-red-500">Deleted</span>
                            ) : (
                              <span className="text-yellow-500">Pending</span>
                            )}
                          </td>
                          <td className="p-4 flex gap-4">
                            <Button
                              onClick={() => handleUserApproval(intRegistrationId)}
                              color="blue"
                              buttonType="filled"
                              size="small"
                              rounded={false}
                              block={false}
                              iconOnly={false}
                              ripple="light"
                              disabled={isApproved === 1} // Disable the button if already approved
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleUserDecline(intRegistrationId)}
                              color="red"
                              buttonType="filled"
                              size="small"
                              rounded={false}
                              block={false}
                              iconOnly={false}
                              ripple="light"
                              disabled={isApproved === 1 || isApproved === 2}  // Disable the button if already approved
                            >
                              Decline
                            </Button>
                            <Button
                              onClick={() => handleUserEdit(intRegistrationId)}
                              color="orange"
                              buttonType="filled"
                              size="small"
                              rounded={false}
                              block={false}
                              iconOnly={false}
                              ripple="light"
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Page {currentPage} of {totalPages}
                </Typography>
                <div className="flex gap-2">
                <Button className="border-green text-green"
                    variant="outlined"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button className="border-green text-green"
                    variant="outlined"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewUsers;
