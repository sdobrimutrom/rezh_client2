import jwt_decode from 'jwt-decode';

import { IJwtPayload } from '../types/IJwtPayload';

export const getRolesFromToken = (token: string): string[] => {
    const decoded = jwt_decode(token) as IJwtPayload;
    const userRoles = decoded?.roles?.map((role) => role.value);
    return userRoles;
};
