import React from 'react';

const Pagination = ({ currentPage, totalPages, onChange, size, color }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    onChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`pagination-page ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ul className={`pagination ${size ? `pagination-${size}` : ''} ${color ? `pagination-${color}` : ''}`}>
      <li
        className={`pagination-previous ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={handlePreviousPage}
      >
        Previous
      </li>
      {renderPageNumbers()}
      <li
        className={`pagination-next ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={handleNextPage}
      >
        Next
      </li>
    </ul>
  );
};

export default Pagination;