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

const TABLE_HEAD = [
  "ID",
  "Title",
  "Category",
  "Description",
  "Writer",
  "Publication Date",
  "Status",
  "Action",
];
const ITEMS_PER_PAGE = 10;

export const ViewArticles = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44392/api/Article/GetArticles"
      );
      setArticles(response.data.listArticle);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
  const handleArticleApproval = async (articleId) => {
    try {
      const response = await axios.post(
        "https://localhost:44392/api/Article/ArticleApproval",
        {
          intArticleId: articleId,
        }
      );

      // Handle the response as needed after approving the article
      if (response.status === 200) {
        console.log("Article Approved");

        // Find the index of the approved user in the users array
        const articleIndex = articles.findIndex(article => article.intArticleId === articleId);

        // Update the status of the approved user in the users array
        if (articleIndex !== -1) {
          const updatedArticles = [...articles];
          updatedArticles[articleIndex].isApproved = 1;
          setArticles(updatedArticles);
        }
      } else {
        console.log("Article Approval Failed");
      }
    } catch (error) {
      console.error("Error approving article:", error);
    }
  };

  const handleArticleDecline = async (articleId) => {
    try {
      const response = await axios.post(
        "https://localhost:44392/api/Article/DeclineArticle",
        { intArticleId: articleId }
      );

      // Handle the response as needed after declining the article
      console.log(response.data);

      // Find the index of the declined user in the articles array
      const articleIndex = articles.findIndex((article) => article.intArticleId === articleId);

      // Update the status of the declined article in the users array
      if (articleIndex !== -1) {
        const updatedAricles = [...articles];
        updatedArticles[articleIndex].isApproved = 2;
        setArticles(updatedArticles);
      }
    } catch (error) {
      console.error("Error declining article:", error);
    }
  };

  const handleArticleEdit = (articleId) => {
    navigate(`/EditArticle/${articleId}`);
  };

  return (
    <Fragment>
      <Sidebar />
      <div className="ml-[20rem] p-10">
        <div className="">
          <div className="flex justify-between">
            <Typography variant="h2">View Articles</Typography>
            <Link to="/AddArticles"><Button>Create Article</Button></Link>
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
                              className="font-normal"
                            >
                              {strTitle}
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
                              className="font-normal"
                            >
                              {strDescription}
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
                              <span className="text-red-500">Deleted</span>
                            ) : (
                              <span className="text-yellow-500">Pending</span>
                            )}
                          </td>
                          <td className="p-4 flex gap-4">
                            <Button
                              onClick={() => handleArticleApproval(intArticleId)}
                              color="blue"
                              buttonType="filled"
                              size="small"
                              rounded={false}
                              block={false}
                              iconOnly={false}
                              ripple="light"
                              disabled={isApproved === 1} // Disable the button if already approved
                            >
                              Publish
                            </Button>
                            <Button
                              onClick={() => handleArticleDecline(intArticleId)}
                              color="red"
                              buttonType="filled"
                              size="small"
                              rounded={false}
                              block={false}
                              iconOnly={false}
                              ripple="light"
                              disabled={isApproved === 1 || isApproved === 2}  // Disable the button if already approved
                            >
                              Deleted
                            </Button>
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
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
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

export default ViewArticles;
