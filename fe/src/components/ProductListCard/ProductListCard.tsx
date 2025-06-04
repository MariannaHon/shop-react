import styles from './ProductListCard.module.scss';
import { apiBaseUrl } from '../../services';
import { Product } from '../../models/product';
import useNavigateToProduct from '@/hooks/useNavigateToProduct';

interface ProductListCardProps {
    product: Product;
}

const ProductListCard = ({ product }: ProductListCardProps) => {
    const navigateToProduct = useNavigateToProduct();

    return (
        <div className={styles.card} onClick={() => navigateToProduct(product._id)}>
            {product.price <= 80 && (<p className="triangle triangle-sale">Sale</p>)}
            {product.sold < 30 && <p className="triangle triangle-new">New</p>}

            <img
                className={`mb-10 ${styles.img}`}
                src={`${apiBaseUrl}${product.images[0]}`}
                alt={product.slug}
            />
            <div className={styles.details}>  
                <div className={styles.details__description}>
                    <h2 className={styles.details__name}>{product.title}</h2>
                    <p>{product.description}</p>
                </div>
                <p className={styles.details__price}>${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductListCard;
