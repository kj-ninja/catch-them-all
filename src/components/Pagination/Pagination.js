import React, {useCallback} from "react";
import './Pagination.scss';

const PaginationComponent = ({ pages, active, setPaginate, setActive, paginate }) => {

    const handlePaginate = useCallback(e => {
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
            offset: (e.target.value - 1) * 10
        });
        setActive(e.target.value);
    }, []);

    return (
        <>
            <div className="pagination">
                {pages.map((page, index) => (
                    <li key={index} value={page} onClick={handlePaginate} className={active === page ? 'active' : ''}>
                        {page}
                    </li>
                ))}
            </div>
        </>
    );
};

export default PaginationComponent;
