import React, { useEffect, useRef, useState } from 'react';
import { Constant } from '../../constants/constant';

interface PaginationProps {
  currentPage: number;
  count: number;
  onPageChange: (page: number) => void;
  rows?: number;
}

export default function Pagination(props: any) {
  const { currentPage, count, onPageChange, rows } = props
  const totalPage = useRef<number>(Math.ceil(count / (rows == undefined ? Constant.ROWS_OF_PAGE : rows)));

  const [pages, setPages] = useState<any>([]);

  const [pre10, setPre10] = useState<number>(0);
  const [next10, setNext10] = useState<number>(0);

  useEffect(() => {
    const _rows = (rows == undefined ? Constant.ROWS_OF_PAGE : rows);
    totalPage.current = Math.ceil(count / (_rows));
    const pageNumbers: any = [];
    const pageStart = Math.floor(currentPage / _rows) * _rows;
    const pageEnd = pageStart + Number(_rows) - 1;

    for (let i = 1; i <= totalPage.current; i++) {
      if (pageStart <= i && i <= pageEnd) {
        pageNumbers.push({ page: i })
      }
    }
    if (pageEnd < totalPage.current) {
      setNext10(pageEnd + 1);
    }
    if (pageStart >= _rows) {
      setPre10(pageStart - 1);
    }
    setPages(() => {
      return [...pageNumbers]
    })
  }, [count, rows, currentPage]);


  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <>

      <div className="row align-items-center justify-content-end py-2 pe-0 fs--1">
        <div className="col-auto">
          <nav aria-label="Page navigation">
            <ul className="pagination pagination-lg m-0">
              {currentPage > 1 && (
                <>
                  {''}
                  {/* <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="page-link"
                    data-list-pagination="prev"
                    >
                    <span className="fas fa-chevron-left"></span>
                    </button> */}
                  <li className="page-item">
                    <a onClick={() => handlePageChange(currentPage - 1)} className="pointer page-link rounded-0" aria-label="Previous">
                      <span aria-hidden="true"><i className="bi bi-arrow-left"></i></span>
                    </a>
                  </li>
                </>
              )}
              {pre10 > 0 && pages.length > 0 && pages[0].page > pre10 &&
                // <button onClick={() => handlePageChange(pre10)} className="page" type="button">
                //   ...
                // </button>
                <li className="page-item"><a onClick={() => handlePageChange(pre10)} className="pointer page-link">...</a></li>
              }

              {pages.length > 0 &&
                pages.map((item: any) => {
                  return <li id={item.page} key={item.page} className={`page-item ${item.page === currentPage ? 'active' : ''}`}>
                    {/* <button onClick={() => handlePageChange(item.page)} className="page" type="button">
                        {item.page}
                      </button> */}
                    <a onClick={() => handlePageChange(item.page)} className="pointer page-link rounded-0">{item.page}</a>
                  </li>
                })}
              {next10 > 0 && pages.length > 0 && pages[pages.length - 1].page < next10 && next10 < totalPage.current &&
                // <button onClick={() => handlePageChange(next10)} className="page" type="button">
                //   ...
                // </button>
                <li className="page-item"><a onClick={() => handlePageChange(next10)} className="pointer page-link">...</a></li>
              }

              {currentPage < totalPage.current && (
                <>
                  {''}
                  {/* <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="page-link pe-0"
                    data-list-pagination="next"
                  >
                    <span className="fas fa-chevron-right"></span>
                  </button> */}
                  <li className="page-item">
                    <a onClick={() => handlePageChange(currentPage + 1)} className="pointer page-link rounded-0" aria-label="Next">
                      <span aria-hidden="true"><i className="bi bi-arrow-right"></i></span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
