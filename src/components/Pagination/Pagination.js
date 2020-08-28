import React from "react";
import {PaginationContainer, PaginationItem} from "./Pagination.styled";

const PaginationComponent = ({ pages, active, setPaginate, setActive, paginate }) => {

    const handlePaginate = e => {
        if (e.target.value === 0) {
            return;
        }
        if (e.target.value === 1) {
            setPaginate({
                ...paginate,
                offset: 0
            });
        }
        setPaginate({
            ...paginate,
            offset: (e.target.value - 1) * 100
        });
        setActive(e.target.value);
    };

    return (
        <>
            <PaginationContainer>
                {pages.map((page, index) => (
                    <PaginationItem key={index} value={page} onClick={handlePaginate} isActive={active === page ? true : null}>
                        {page}
                    </PaginationItem>
                ))}
            </PaginationContainer>
        </>
    );
};

export default PaginationComponent;
