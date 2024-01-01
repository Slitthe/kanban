'use client';

import { useLayoutEffect } from 'react';
import { getLoggedInStatus } from '@/src/auth-utils';
import { redirect } from 'next/navigation';

function Dashboard() {
    console.log(window?.localStorage);
    const isAuth = getLoggedInStatus();

    useLayoutEffect(() => {
        if (!isAuth) {
            redirect('/login');
        }
    }, []);
    return <div>dashboard</div>;
}

export default Dashboard;

export const revalidate = 0;
