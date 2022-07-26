import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { useDispatch } from "react-redux";
import { changePageCount } from "../../redux/filter/slice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(changePageCount(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      // forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
