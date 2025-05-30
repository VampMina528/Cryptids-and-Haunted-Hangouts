import type { ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    return Auth.loggedIn() ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute