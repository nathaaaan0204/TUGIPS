import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Input,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import { FeaturesStaffSidebarComponents } from "../Components/FeaturesStaffSidebarComponents";

const TABLE_HEAD = [
  "ID",
  "Title",
  "Category",
  "Description",
  "Volume",
  "Writer",
  "Publication Date",
  "Status",
  "Action",
  "Feedback"
];
const ITEMS_PER_PAGE = 10;

export const FeaturesStaffViewArticles = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44392/api/Article/GetArticles"
        );
        const allArticles = response.data.listArticle;
        const newsArticles = allArticles.filter(
          (article) => article.strCategory === "Feature"
        );
        setArticles(newsArticles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }; 
    fetchArticles();
  }, []);
  // Filter the rows based on the search query
  const filteredRows = articles.filter((row) =>
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
  const handleArticleEdit = (articleId) => {
    navigate(`/StaffEditArticles/${articleId}`);
  };

  return (
    <Fragment>
      <FeaturesStaffSidebarComponents />
      <div className="lg:ml-[20rem] h-screen py-16 px-8 flex flex-col gap-10">
        <div className="">
          <div className="flex sm:justify-between gap-5 flex-wrap justify-center">
            <Typography variant="h2">View Articles</Typography>
            <Link to="/AddArticles">
              <Button className="  bg-green w-[200px]">

                Create Articles
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
                        Loading articles...
                      </td>
                    </tr>
                  ) : (
                    displayedRows.map(
                      ({
                        intArticleId,
                        strTitle,
                        strCategory,
                        strDescription,
                        strWriter,
                        publicationDate,
                        isApproved,
                        strFeedback,
                        strVolume
                      }) => (
                        <tr key={intArticleId} className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {intArticleId}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal double-spacing"
                            >
                              {strTitle.length > 15 ? `${strTitle.substring(0, 15)}...` : strTitle}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {strCategory}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal double-spacing"
                            >
                              {strDescription.length > 20 ? `${strDescription.substring(0, 20)}...` : strDescription}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {strVolume}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {strWriter}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {publicationDate}
                            </Typography>
                          </td>
                          <td className="p-4">
                            {isApproved === 1 ? (
                              <span className="text-green-500">Publish</span>
                            ) : isApproved === 2 ? (
                              <span className="text-red-500">Decline</span>
                            ) : isApproved === 3 ? (
                              <span className="text-red-500">Submitted</span>
                            )
                            : (
                              <span className="text-yellow-500">Pending</span>
                            )}
                          </td>
                          <td className="p-4 flex gap-4">
                            
                            <Button
                              onClick={() => handleArticleEdit(intArticleId)}
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
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {strFeedback}
                            </Typography>
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

export default FeaturesStaffViewArticles;
