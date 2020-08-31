import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";


export default function Pagination(props) {
  const [limit, setLimit] = useState(props.limit);
  const [offsetStart, setOffsetStart] = useState(props.offset);
  const [total, setTotal] = useState(props.total);

  console.log(props);

  useEffect(() => {
    setLimit(props.limit);
    setOffsetStart(props.offset);
    setTotal(props.total);
  }, [props.limit, props.offset, props.total])

  function pageCount() {
    return Math.ceil(total / limit);
  }

  function handlePageChange(data) {
    // data.selected is the zero indexed selected page. i.e. page - 1.
    const page = data.selected++;
    props.handlePageChange(limit, limit * page + 1);
  }

  // Return the current selected page index. i.e. current page - 1.
  function currentPage() {
    return ((offsetStart - 1)/ limit);
  }

  return (
    <div className="flex justify-center">
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount()}
        forcePage={currentPage()}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}