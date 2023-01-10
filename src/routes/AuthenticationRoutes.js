import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import ViewUserCreation from 'views/pages/authentication/userManagement/ViewUserCreation';
import MainLayout from 'layout/MainLayout';
import Login from 'views/pages/authentication/userManagement/UserLogin';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        }
        // {
        //     path: '/pages/usermanagement/login',
        //     element: <Login />
        // }
    ],
    element: <MainLayout />,
    children: [
        {
            path: '/pages/usermanagement/usercreation',
            element: <ViewUserCreation />
        }
        // {
        //     path: '/pages/register/register3',
        //     element: <AuthRegister3 />
        // }
    ]
};

export default AuthenticationRoutes;
