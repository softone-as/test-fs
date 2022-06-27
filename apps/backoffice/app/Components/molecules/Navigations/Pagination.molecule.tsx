import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Inertia } from '@inertiajs/inertia';
import { getCurrentQueryParams } from '../../../Utils/utils';

type PaginationProps = {
    lastPage: number;
    setDisableTable?: React.Dispatch<React.SetStateAction<boolean>>;
    currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
    lastPage: pageCount,
    currentPage,
    setDisableTable = (isDisableTable) => { }
}) => {

    const handlePageClick = (data: { selected: number }) => {
        const currentParams = getCurrentQueryParams();
        setDisableTable(true)
        Inertia.visit(window.location.pathname, {
            data: {
                ...currentParams,
                page: data.selected + 1,
            },
            onFinish: () => setDisableTable(false),
            onSuccess: () => setDisableTable(false),
        });
    };

    return (
        <div className="products__more">
            <ReactPaginate
                pageCount={pageCount}
                initialPage={currentPage - 1}
                forcePage={currentPage - 1}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                previousLabel="&#x276E;"
                nextLabel="&#x276F;"
                containerClassName="pagination"
                activeLinkClassName="active"
                pageLinkClassName="btn btn_gray"
                previousLinkClassName="btn btn_gray"
                nextLinkClassName="btn btn_gray"
                disabledClassName="disabled"
                onPageChange={handlePageClick}
                disableInitialCallback={true}
            />
        </div>
    );
};

export default Pagination;
