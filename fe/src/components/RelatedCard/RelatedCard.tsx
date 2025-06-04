import { apiBaseUrl } from '../../services';
import { Product } from '../../models/product';
import Triangle from '../Triangle/Triangle';
import useNavigateToProduct from '@/hooks/useNavigateToProduct';
import styles from "./RelatedCard.module.scss";

export interface RelatedCardProps {
    product: Product;
}

const RelatedCard = ({ product }: RelatedCardProps) => {
    const navigateToProduct = useNavigateToProduct();

    return (
        <div className={styles.card} onClick={() => navigateToProduct(product._id)}>
            <Triangle product={product} />
            <img
                className={`mb-10 ${styles.img}`}
                src={`${apiBaseUrl}${product.images[0]}`}
                alt={product.slug}
                width={220}
                height={150}
            />
            <h3 className={styles.name}>{product.title}</h3>
            <p className={styles.text}>${product.price.toFixed(2)}</p>
        </div>
    );
};

export default RelatedCard;
