import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

interface PrivateRouteProps {
    component: React.ComponentType;
    redirectTo: string;
}

export const PrivateRoute = ({
    component: Component,
    redirectTo,
}: PrivateRouteProps) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
};
