import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getCart, updateCart, removeItem } from '@/redux/cart/operations';
import styles from './CartPage.module.scss';
import { DELIVERY_COST, GIFT_VOUCHER } from '@/constants';
import { selectLoading, selectProducts } from '@/redux/products/selectors';
import { fetchProducts } from '@/redux/products/operations';
import { apiBaseUrl } from '@/services';
import { selectCart, selectCartLoading } from '@/redux/cart/selectors';

const CartPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector(selectCart);
    const cartLoading = useSelector(selectCartLoading);
    const productsLoading = useSelector(selectLoading);
    const allProducts = useSelector(selectProducts);

    useEffect(() => {
        dispatch(getCart());
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1 || !cart) return;
        dispatch(updateCart({ itemId, quantity: newQuantity }));
    };

    const handleRemoveItem = (itemId: string) => {
        dispatch(removeItem({ itemId }));
    };

    const cartItemsWithDetails = useMemo(() => {
        if (!cart?.data?.cartItems || !allProducts?.length) {
            return [];
        }

        return cart.data.cartItems.map(cartItem => {
            const product = allProducts.find(p => p._id === cartItem.product);
            return {
                productId: cartItem.product,
                cartSpecificId: cartItem._id,
                title: product?.title,
                image: `${apiBaseUrl}${product?.images?.[0]}`,
                price: cartItem.price,
                quantity: cartItem.quantity,
                id: cartItem._id,
            };
        });
    }, [cart, allProducts]);

    const subtotal =
        cart?.data.cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        ) || 0;

    const total = subtotal + DELIVERY_COST - GIFT_VOUCHER;
    const isLoading = cartLoading || productsLoading;

    return (
        <div className={styles.cartPageWrapper}>
            {isLoading && (
                <div className={styles.loadingOverlay}>Loading...</div>
            )}
            <div className={styles.cartPage}>
                <div className={styles.backLinkContainer}>
                    <a href="#" className={styles.backLink}>
                        &lt; Back to previous page
                    </a>
                </div>
                <h2 className={styles.cartTitle}>Cart</h2>
                {!isLoading && cartItemsWithDetails.length === 0 ? (
                    <div className={styles.emptyCartMessage}>
                        <p className={styles.emptyCartText}>
                            Your cart is empty.
                        </p>
                        <button className={styles.emptyCartButton}>
                            Continue shopping
                        </button>
                    </div>
                ) : (
                    <div className={styles.cartContentWrapper}>
                        <div className={styles.cartHeader}>
                            <div className={styles.headerProduct}>Product</div>
                            <div className={styles.headerPrice}>Price</div>
                            <div className={styles.headerQuantity}>
                                Quantity
                            </div>
                            <div className={styles.headerAmount}>Amount</div>
                        </div>
                        {cartItemsWithDetails.map(item => (
                            <div
                                key={item.productId}
                                className={styles.cartItem}
                            >
                                <div className={styles.productInfo}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={styles.productImage}
                                    />
                                    <div>
                                        <h3 className={styles.productName}>
                                            {item.title}
                                        </h3>{' '}
                                    </div>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() =>
                                            handleRemoveItem(item.id)
                                        }
                                    >
                                        x
                                    </button>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p className={styles.price}>
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className={styles.quantityControl}>
                                    <div className={styles.quantityInner}>
                                        <input
                                            type="text"
                                            value={item.quantity}
                                            onChange={e =>
                                                handleQuantityChange(
                                                    item.id,
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                            className={styles.quantityInput}
                                        />
                                        <div className={styles.quantityChange}>
                                            <button
                                                className={
                                                    styles.quantityButton
                                                }
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                <svg
                                                    fill="#000000"
                                                    height="30"
                                                    width="30"
                                                    version="1.1"
                                                    id="Layer_1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 500 500"
                                                >
                                                    <path
                                                        d="M306,192h-48v-48c0-4.4-3.6-8-8-8s-8,3.6-8,8v48h-48c-4.4,0-8,3.6-8,8s3.6,8,8,8h48v48c0,4.4,3.6,8,8,8s8-3.6,8-8v-48h48
	c4.4,0,8-3.6,8-8S310.4,192,306,192z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className={`${styles.quantityButton} ${styles.quantityButtonMinus}`}
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                <svg
                                                    width="14"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M6.00001 11.25L18 11.25L18 12.75L6.00001 12.75L6.00001 11.25Z"
                                                        fill="#080341"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.itemAmount}>
                                    <p className={styles.amount}>
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className={styles.totals}>
                            <div className={styles.totalRow}>
                                <span className={styles.totalLabel}>
                                    Subtotal
                                </span>
                                <span className={styles.totalValue}>
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className={styles.totalRow}>
                                <span className={styles.totalLabel}>
                                    Delivery costs
                                </span>
                                <span className={styles.totalValue}>
                                    ${DELIVERY_COST.toFixed(2)}
                                </span>
                            </div>
                            <div className={styles.totalRow}>
                                <span className={styles.totalLabel}>
                                    Gift voucher
                                </span>
                                <span className={styles.totalValue}>
                                    -${GIFT_VOUCHER.toFixed(2)}
                                </span>
                            </div>
                            <div className={styles.finalTotalRow}>
                                <span className={styles.totalLabelFinal}>
                                    Total (Including Tax)
                                </span>
                                <span className={styles.totalValueFinal}>
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.continueShoppingButton}>
                                Continue shopping
                            </button>
                            <button className={styles.checkoutButton}>
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default CartPage;
