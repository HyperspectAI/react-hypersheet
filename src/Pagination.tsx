/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

function Pagination({
  isPagination,
  currentPage,
  totalPages,
  perPageOptions,
  perPage,
  onPageChange,
  onPerPageChange,
}: any) {
  const [showPerPageOptions, setShowPerPageOptions] = useState(false);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePerPageChange = (value: string) => {
    onPerPageChange(value);
  };

  // eslint-disable-next-line max-len
  const renderPerPageOptions = () => perPageOptions.map((option: any, index : number) => (
    <option key={index as any} value={option}>
      {option}
      {' '}
      per page
    </option>
  ));

  const renderPaginationButtons = () => {
    const buttons = [];

    const maxVisibleButtons = 5; // Maximum number of visible page buttons
    const halfMaxVisibleButtons = Math.floor(maxVisibleButtons / 2);

    let startPage = Math.max(currentPage - halfMaxVisibleButtons, 1);
    const endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(endPage - maxVisibleButtons + 1, 1);
    }

    for (let i = startPage; i <= endPage; i += 1) {
      buttons.push(
        <button
          key={i}
          // eslint-disable-next-line max-len
          className={currentPage === i ? 'pagination__button active' : 'pagination__button'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    return buttons;
  };
  return (
    isPagination ? (
      <div className="pagination">
        <div className="pagination__per-page">
          <span>Show:</span>
          <div className="pagination__per-page-dropdown">
            <select
              value={perPage}
              onChange={(e) => handlePerPageChange(e.target.value)}
              onFocus={() => setShowPerPageOptions(true)}
              onBlur={() => setShowPerPageOptions(false)}
            >
              {renderPerPageOptions()}
            </select>
            {showPerPageOptions && (
            <div className="pagination__per-page-options">
              {renderPerPageOptions()}
            </div>
            )}
          </div>
        </div>
        <div className="pagination__pages">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination__button"
          >
            &lt; Prev
          </button>
          {renderPaginationButtons()}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination__button"
          >
            Next &gt;
          </button>
        </div>
      </div>
    ) : null
  );
}

export default Pagination;
