import { Fragment, useState, useEffect } from "react";
import Pagination from "../Components/Pagination";
import axios from "axios";
import React from "react";
import {
  Button,
  Card,
  Input,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Sidebar } from '../Components/Sidebar'
import { Link, useNavigate } from "react-router-dom";

const TABLE_HEAD = ["ID", "Name", "Email", "Role", "Status", "Actions"];
const ITEMS_PER_PAGE = 10; // Number of items per page

export const ViewUsers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44392/api/Registration/GetRegistration"
        );
        console.log(response.data);
        setData(response.data.listRegistration);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save the updated data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("listRegistration", JSON.stringify(data));
  }, [data]);

  // Initialize the data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("listRegistration");
    if (savedData) {
      setData(JSON.parse(savedData));
      setLoading(false);
    }
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = async (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
    setCurrentPage(1); // Reset to the first page when searching

    try {
      const response = await axios.get(
        "https://localhost:44392/api/Registration/SearchRegistrations",
        {
          params: {
            searchCriteria: searchQuery,
          },
        }
      );
      setData(response.data.listRegistration);
    } catch (error) {
      setError(error);
    }
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter the rows based on the search query
  const filteredRows =
    data &&
    data.filter((row) =>
      Object.values(row).some((value) =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const displayedRows = filteredRows && filteredRows.slice(startIndex, endIndex);
  const totalPages = filteredRows ? Math.ceil(filteredRows.length / ITEMS_PER_PAGE) : 0;

  const handleUserApproval = async (registrationId) => {
    try {
      const response = await axios.post(`https://localhost:44392/api/Registration/UserApproval`, {
        intRegistrationId: registrationId
      });

      // Handle the response as needed after approving the user
      if (response.status === 200) {
        console.log("User Approved");

        // Find the index of the approved user in the data array
        const userIndex = data.findIndex(user => user.intRegistrationId === registrationId);

        // Update the status of the approved user in the data array
        if (userIndex !== -1) {
          const updatedData = [...data];
          updatedData[userIndex].isApproved = 1;
          setData(updatedData);
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

      // Find the index of the declined user in the data array
      const userIndex = data.findIndex((user) => user.intRegistrationId === registrationId);

      // Update the status of the declined user in the data array
      if (userIndex !== -1) {
        const updatedData = [...data];
        updatedData[userIndex].isApproved = 2;
        setData(updatedData);
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
      <Sidebar />
      <div className='ml-[20rem] p-10'>
        <div className=''>
          <div className='flex justify-between'>
            <Typography variant="h2">Manage Users</Typography>
            <Link to="/AddUsers"><Button>Create User</Button></Link>
          </div>
          <div className='mt-10'>
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
                          {TABLE_HEAD.map((head, index) => (
                            <th
                              key={index}
                              className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
                            >
                              {head}
                            </th>
                          ))}
                        </tr>

                </thead>
                <tbody>
                {displayedRows &&
                          displayedRows.map((row) => (
                    <tr key={row.intRegistrationId}>
                      <td className="border px-4 py-2">{row.intRegistrationId}</td>
                      <td className="border px-4 py-2">{row.strName}</td>
                      <td className="border px-4 py-2">{row.strEmail}</td>
                      <td className="border px-4 py-2">{row.strRole}</td>
                      <td className="border px-4 py-2">
                        {row.isApproved === 1 ? (
                          <span className="text-orange-500">Approved</span>
                        ) : row.isApproved === 0 ? (
                          <span className="text-yellow-500">Pending</span>
                        ) : (
                          <span className="text-red-500">Decline</span>
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        <Button
                          onClick={() => handleUserApproval(row.intRegistrationId)}
                          color="blue"
                          buttonType="filled"
                          size="small"
                          rounded={false}
                          block={false}
                          iconOnly={false}
                          ripple="light"
                          disabled={row.isApproved === 1} // Disable the button if already approved
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleUserDecline(row.intRegistrationId)}
                          color="red"
                          buttonType="filled"
                          size="small"
                          rounded={false}
                          block={false}
                          iconOnly={false}
                          ripple="light"
                          disabled={row.isApproved === 1 || row.isApproved === 2}  // Disable the button if already approved
                        >
                          Decline
                        </Button>
                        <Button
                          onClick={() => handleUserEdit(row.intRegistrationId)}
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
                  ))}
                </tbody>
              </table>
              <CardFooter>
                <Pagination
                  totalResults={filteredRows ? filteredRows.length : 0}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  resultsPerPage={ITEMS_PER_PAGE}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewUsers;