import css from './PopularCard.module.scss';
import { apiBaseUrl } from '../../services';
import { Product } from '../../models/product';
import Triangle from '../Triangle/Triangle';
import useNavigateToProduct from '@/hooks/useNavigateToProduct';

interface PopularCardProps {
    product: Product;
}

const PopularCard = ({ product }: PopularCardProps) => {
    const navigateToProduct = useNavigateToProduct();

    return (
        <div className={css.card} onClick={() => navigateToProduct(product._id)}>
            <Triangle product={product} />
            <img
                className={`mb-10 ${css.img}`}
                src={`${apiBaseUrl}${product.images[0]}`}
                alt={product.slug}
                width={200}
                height={277}
            />
            <h3 className={css.name}>{product.title}</h3>
            <p className={css.text}>${product.price.toFixed(2)}</p>
        </div>
    );
};

export default PopularCard;
