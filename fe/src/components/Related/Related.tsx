import styles from "./Related.module.scss";
import RelatedCard from '../RelatedCard/RelatedCard';
import { useSelector } from "react-redux";
import { selectRelatedLoading, selectRelatedProducts } from "@/redux/relatedProducts/selectors";
import Skeleton from "../Skeletons/Skeleton";

const Related = () => {
    const relatedProducts = useSelector(selectRelatedProducts);
    const loading = useSelector(selectRelatedLoading);

    const loadingTemplate = (
        <>
            {Array.from({length: 6}).map((_, i) => 
                <li key={i}>
                    <Skeleton width="14rem" height="20rem"/>
                </li>
            )}
        </>
    );

    const normalTemplate = (
        <>
            {relatedProducts.map(product => (
                <li key={product._id}>
                    {<RelatedCard product={product} />}
                </li>
            ))}
        </>
    );

    return (
        <section className={styles.related}>
            <div className={styles.related__header}>
                <h1>RELATED PRODUCTS</h1>
                <div className={styles.related__headerStripe}></div>
            </div>
            <ul className={styles.related__products}>
                {loading ? loadingTemplate : normalTemplate}
            </ul>
        </section>
    );
};

export default Related;
