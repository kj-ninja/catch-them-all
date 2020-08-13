import React from "react";
import './Pagination.scss';

const PaginationComponent = ({ pages, handleClick, active }) => {
    return (
        <>
            <div className="pagination">
                {pages.map((page, index) => (
                    <li key={index} value={page} onClick={handleClick} className={active === page ? 'active' : ''}>
                        {page}
                    </li>
                ))}
            </div>
        </>
    );
};

export default PaginationComponent;
