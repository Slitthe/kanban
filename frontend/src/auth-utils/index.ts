'use client';

import { JWT } from '../types/auth.ts';
import { jwtDecode } from 'jwt-decode';

export function setToken(token: string) {
    localStorage.setItem('jwtToken', token);
}

export function getToken(): string | null {
    return localStorage.getItem('jwtToken');
}

export function clearToken(): void {
    localStorage.removeItem('jwtToken');
}

export const getLoggedInStatus = () => {
    const token = getToken();

    if (token === null) {
        return false;
    }

    const decodedJWT: JWT = jwtDecode(token as string);

    const currentDate = Date.now() / 1000;
    return currentDate <= decodedJWT.exp;
};
