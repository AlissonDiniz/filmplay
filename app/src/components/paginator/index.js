import React from 'react';
import BootstrapPaginator from 'react-bootstrap-pagination';

function Paginator({limitPage, pageable, loadData}) {

    const pagination = {
        totalPages: () => {
            return pageable.totalPages;
        },
        currentPage: (page) => {
            if (page && page !== pageable.page) {
                loadData(page, pageable.sort, pageable.order);
            }
            return pageable.page;
        },
        ready: () => {
            return true;
        }
    };

    return (
        <BootstrapPaginator pagination={pagination} limit={limitPage} containerClass='float-right' />
    );
}

export default Paginator;