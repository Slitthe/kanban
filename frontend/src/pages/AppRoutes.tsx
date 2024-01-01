import { Route, Routes } from 'react-router-dom';
// import Login from './login';
// import Register from './register';
import ProtectedRoute from '../components/protected-route';
import DashboardLayout from '../components/dashboard-layout';
// import Columns from './columns';
import React, { Suspense } from 'react';
import tw from 'tailwind-styled-components';

const Login = React.lazy(() => import('./login'));
const Register = React.lazy(() => import('./register'));
const Columns = React.lazy(() => import('./columns'));
const Playground = React.lazy(() => import('./playground'));

const RoutesWrapper = tw.div`
    dark:bg-gray
    min-h-full
`;

function AppRoutes() {
    return (
        <RoutesWrapper>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/'} element={<Playground />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/register'} element={<Register />} />
                    <Route
                        path={'/dashboard/*'}
                        element={
                            <ProtectedRoute>
                                <DashboardLayout>
                                    <Routes>
                                        <Route
                                            element={<Columns />}
                                            path={'/:boardId'}
                                        />
                                    </Routes>
                                </DashboardLayout>
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>
            </Suspense>
        </RoutesWrapper>
    );
}

export default AppRoutes;
