import { Navigate, Outlet } from 'react-router-dom';

import { getRolesFromToken } from '../../helpers/jwt-token.helper';

interface ProtectedRouteProps {
    redirectPath?: string;
    roles: string[];
}

export default function ProtectedRoute({ redirectPath = '/forbidden', roles }: ProtectedRouteProps) {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return <Navigate to={redirectPath} />;
    }
    const userRoles = getRolesFromToken(token);
    const isAllowed = roles.filter((role) => userRoles.includes(role)).length > 0;

    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />;
}
