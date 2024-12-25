import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './RouteConstants';
import HomePage from '../pages/HomePage';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoutes from './ProtectedRoutes';

const ReactRoute = createBrowserRouter([
    {
        path: `${ROUTES.login}`,
        element: <LoginPage />
    },
    {
        path: `${ROUTES.register}`,
        element: <RegisterPage />
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: `${ROUTES.home}`,
                element: <HomePage />
            },
            {
                path: `${ROUTES.chat}`,
                element: <ChatPage /> 
            }
        ]
    }
]);

export default ReactRoute