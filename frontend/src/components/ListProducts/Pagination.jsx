import React from 'react';
import Styles from "./Style.module.css"
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (pageNumbers.length < 2) return null; // This check ensures pagination doesn't render if not needed
  return (
    <nav className={Styles.pagination_container}>
      <ul className={Styles.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={Styles.page_item}>
            <a onClick={() => paginate(number)} className={Styles.page_link}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};


export default Pagination;