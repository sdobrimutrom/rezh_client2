import jwt_decode from 'jwt-decode';

import { JwtPayload } from '../types/jwt-payload';

export const getRolesFromToken = (token: string): string[] => {
    const decoded = jwt_decode(token) as JwtPayload;
    const userRoles = decoded?.roles?.map((role) => role.value);
    return userRoles;
};
