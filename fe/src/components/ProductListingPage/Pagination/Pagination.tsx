import { changePage } from "@/redux/products/slice";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectPage, selectTotalPages } from "@/redux/products/selectors";

const Pagination = () => {
    const dispatch = useDispatch<AppDispatch>();

    const currentPage = useSelector(selectPage);
    const pages = useSelector(selectTotalPages);


    const handlePageChange = (pageNumber: number) => {
        dispatch(changePage(pageNumber));
    }

    if (pages.length === 0) return;

    return (
        <nav className={styles.pagination}>
            <a className={styles.pagination__chevron} onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}>&lt;</a>
            <div className={styles.pagination__pageButtons}>
                {pages.map(page => 
                    <a
                        className={`${styles.pagination__button} ${currentPage === page && styles['pagination__button--active']}`}
                        onClick={() => handlePageChange(page)}
                        key={page}
                    >
                        {page}
                    </a>
                )}
            </div>
            <a className={styles.pagination__chevron} onClick={() => handlePageChange(currentPage < pages.length ? currentPage + 1 : pages.length)}>&gt;</a>
        </nav>
    );
}

export default Pagination;