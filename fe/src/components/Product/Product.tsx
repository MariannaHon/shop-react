import { useEffect, useState } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/dist/photoswipe.css';
import { apiBaseUrl } from '@/services';
import styles from './Product.module.scss';
import './photoswipe.css';
import QuantitySelect from './QuantitySelect/QuantitySelect';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectProductById,
    selectProductLoading,
} from '@/redux/product/selectors';
import Skeleton from '../Skeletons/Skeleton';
import { AddToCartPayload } from '@/models/cart';
import { AppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/cart/operations';
import toast from 'react-hot-toast';

const Product = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [selectedQuantity, setSelectedQuantity] = useState<string>('0');

    const productLoading = useSelector(selectProductLoading);
    const product = useSelector(selectProductById);
    const galleryId = `product-${product?._id}`;

    function handleSelectedQuantity(quantity: string) {
        setSelectedQuantity(quantity);
    }

    useEffect(() => {
        let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
            gallery: '#' + galleryId,
            children: 'a',
            initialZoomLevel: 'fill',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            if (lightbox) lightbox.destroy();
            lightbox = null;
        };
    }, [product, galleryId]);

    function handleAddToCart(item: AddToCartPayload) {
        if (item.quantity > 0) {
            dispatch(addToCart(item));
        } else {
            toast.error('Select quantity.');
        }
    }

    if (productLoading) {
        return (
            <div className={styles.productComponent}>
                <Skeleton width="10rem" height="15rem" />
                <Skeleton width="40rem" height="50rem" />
                <Skeleton width="35rem" height="20rem" />
            </div>
        );
    }

    if (!product) return <p>No product found for this ID</p>;

    const item: AddToCartPayload = {
        productId: product._id,
        color: 'perrywinklepurple',
        quantity: parseInt(selectedQuantity),
    };

    return (
        <div className={styles.productComponent}>
            <div className={`${styles.gallery} pswp-gallery`} id={galleryId}>
                {product.images.map((image, index) => (
                    <a
                        href={`${apiBaseUrl}${image}`}
                        data-pswp-width={568}
                        data-pswp-height={800}
                        key={product._id + '-' + index}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={`${apiBaseUrl}${image}`}
                            className={styles.gallery__img}
                            alt={`image-${index}`}
                        />
                    </a>
                ))}
            </div>
            <img
                className={styles.mainImg}
                src={`${apiBaseUrl}${product.images[0]}`}
                alt="main-image"
            />
            <div className={styles.description}>
                <h2 className="heading--3">{product.title}</h2>
                <p className="paragraph--small">
                    Availability:{' '}
                    {product.quantity > 0 ? (
                        <span style={{ color: 'darkgoldenrod' }}>In stock</span>
                    ) : (
                        <span color="red">Out of stock</span>
                    )}
                </p>
                <p className="paragraph--large">{product.description}</p>
                <p className="heading--3">${product.price.toFixed(2)}</p>
                <QuantitySelect
                    quantity={selectedQuantity}
                    onQuantityChange={handleSelectedQuantity}
                />
                <button
                    className={styles.btn}
                    onClick={() => handleAddToCart(item)}
                >
                    ADD TO CART
                </button>
            </div>
        </div>
    );
};

export default Product;
