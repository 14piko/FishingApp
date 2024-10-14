import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { RoutesNames } from '../constants';

const PrivateRoute = ({ allowedRoles }) => {
    const { isLoggedIn, userRole } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to={RoutesNames.HOME} />;
    }
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={RoutesNames.HOME} />; 
    }

    return <Outlet />; 
};

export default PrivateRoute;