import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { selectIsLoading, selectIsRefresh } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));

const CartPage = lazy(() => import('../../pages/CartPage/CartPage'));

const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));

const NoResultsPage = lazy(
    () => import('../../pages/NoResultsPage/NoResultsPage')
);

const ProductListingPage = lazy(
    () => import('../../pages/ProductListingPage/ProductListingPage')
);

const ProductDetailPage = lazy(
    () => import('../../pages/ProductDetailPage/ProductDetailPage')
);

const RegistrationPage = lazy(
    () => import('../../pages/RegistrationPage/RegistrationPage')
);

function App() {
    const isLoading = useSelector(selectIsLoading);
    const isRefresh = useSelector(selectIsRefresh);

    if (isRefresh) return 'page is refreshing';

    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductListingPage />} />
                    <Route
                        path="/product/:id"
                        element={<ProductDetailPage />}
                    />
                    <Route
                        path="/register"
                        element={
                            <RestrictedRoute
                                component={RegistrationPage}
                                redirectTo="/"
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <RestrictedRoute
                                component={LoginPage}
                                redirectTo="/"
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <PrivateRoute component={CartPage} redirectTo="/" />
                        }
                    />
                    <Route path="*" element={<NoResultsPage />} />
                    {isLoading && 'Loading...'}
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
