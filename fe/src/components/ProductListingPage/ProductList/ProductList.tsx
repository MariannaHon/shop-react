import PopularCard from "@/components/PopularCard/PopularCard";
import ViewOptions from "../ViewOptions/ViewOptions";
import styles from "./ProductList.module.scss";
import ProductListCard from "@/components/ProductListCard/ProductListCard";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectPaginatedProducts, selectView } from "@/redux/products/selectors";
import { useEffect } from "react";
import { AppDispatch } from "@/redux/store";
import { fetchProducts } from "@/redux/products/operations";
import Skeleton from "@/components/Skeletons/Skeleton";
import ImageWithSkeleton from "@/components/Skeletons/ImageWithSkeleton";

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const products = useSelector(selectPaginatedProducts);
    const loading = useSelector(selectLoading);

    const currentView = useSelector(selectView);

    const isGrid = currentView === 'grid';

    const loadingTemplate = isGrid ? (
        <div className={styles.productGrid}>
            {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton height="27.7rem" width="20rem" key={`grid-skeleton-${i}`} />
            ))}
        </div>
    ) : (
        <div className={styles.productList}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton height="15rem" key={`list-skeleton-${i}`} />
            ))}
        </div>
    );

    const normalTemplate = (
        <>
            {products && products.length === 0 && (
                <div style={{ textAlign: "center", width: '100%', padding: '2rem 0' }}>No products found.</div>
            )}
            {products && products.length > 0 && (
                 <div className={isGrid ? styles.productGrid : styles.productList}>
                    {products.map(product =>
                        isGrid ? (
                            <PopularCard product={product} key={product._id} />
                        ) : (
                            <ProductListCard product={product} key={product._id} />
                        )
                    )}
                </div>
            )}
        </>
    );

    return (
        <section className={styles.productListSection}>
            <ImageWithSkeleton src="/images/plp_banner.jpg" alt="banner" skeletonWidth={'100%'} skeletonHeight={'30rem'}/>

            <ViewOptions />

            {loading ? loadingTemplate : normalTemplate}
        </section>
    );
}

export default ProductList;