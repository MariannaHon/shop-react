import ProductList from "@/components/ProductListingPage/ProductList/ProductList";
import FilterSidebar from "../../components/ProductListingPage/FilterSidebar/FilterSidebar"
import styles from "./ProductListingPage.module.scss";
import Pagination from "@/components/ProductListingPage/Pagination/Pagination";

const ProductListingPage = () => {    
    return (
        <main className={`container ${styles.plp}`}>
            <section className={styles.productsSection}>
                <FilterSidebar />
                <ProductList />
            </section>
            <Pagination />
        </main>
    );
};

export default ProductListingPage;
