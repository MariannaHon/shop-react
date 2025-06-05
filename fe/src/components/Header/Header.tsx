import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { logOut } from '@/redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectCart } from '@/redux/cart/selectors';
import { Link } from 'react-router-dom';

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const cart = useSelector(selectCart);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/');
    };

    const handleNavigateToProducts = () => navigate('/products');
    const handleNavigateToHome = () => navigate('/');

    return (
        <header className={styles.header}>
            <div className={styles['top-bar']}>
                <div className={styles.links}>
                    <a href="#" className={styles['links-main']}>
                        MY ACCOUNT
                    </a>

                    <a href="#" className={styles['links-main']}>
                        CHECKOUT
                    </a>

                    {isLoggedIn ? (
                        <button
                            className={styles['btn']}
                            onClick={handleLogout}
                        >
                            LOG OUT
                        </button>
                    ) : (
                        <Link to="/login" className={styles['links-main']}>
                            LOG IN
                        </Link>
                    )}
                </div>
            </div>
            <div className={styles['header-main']}>
                <div className={`${styles.logo} heading--2`}>THE SHOP</div>

                {isLoggedIn && (
                    <Link to="/cart" className={styles.cart}>
                        <img
                            src="/icons/Cart.svg"
                            alt="Cart icon"
                            width="23"
                            height="23"
                        />
                        <span>CART ({cart?.numOfCartItems})</span>
                    </Link>
                )}
            </div>

            <nav className={styles.navbar}>
                <ul>
                    <li>
                        <a onClick={handleNavigateToHome}>HOME</a>
                    </li>
                    <li>
                        <a onClick={handleNavigateToProducts}>PRODUCTS</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
export default Header;
