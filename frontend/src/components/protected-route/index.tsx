import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { getLoggedInStatus } from '../../auth-utils';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const isLogged = getLoggedInStatus();
    if (isLogged) {
        return <>{children}</>;
    } else {
        // Redirect to the login page or any other route for unauthenticated users
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
