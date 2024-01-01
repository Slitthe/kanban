'use client';
import { PropsWithChildren, useLayoutEffect } from 'react';
import { clearToken, getLoggedInStatus } from '@/auth-utils';
import { redirect, useRouter } from 'next/navigation';
import Sidebar from '@/app/components/sidebar';

function DashboardLayout({ children }: PropsWithChildren) {
    const router = useRouter();
    const isAuth = getLoggedInStatus();

    useLayoutEffect(() => {
        if (!isAuth) {
            redirect('/login');
        }
    }, []);
    function logOut() {
        clearToken();
        router.push('/login');
    }

    return (
        isAuth && (
            <div className="h-full">
                <header className="w-full bg-amber-300 p-5">
                    <button
                        className="bg-blue-600 text-white p-2 hover:bg-blue-400"
                        onClick={logOut}
                    >
                        Log Out
                    </button>
                </header>
                <div className="flex h-full">
                    <Sidebar />
                    <div className="bg-fuchsia-200 flex-1">{children}</div>
                </div>
            </div>
        )
    );
}

export default DashboardLayout;
