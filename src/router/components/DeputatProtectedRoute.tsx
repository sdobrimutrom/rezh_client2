import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    redirectPath?: string;
}

export default function DeputatProtectedRoute({
    redirectPath = '/unforbidden'
}: ProtectedRouteProps) {
    const isAllowed = true; // добавить условие
    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />;
}
