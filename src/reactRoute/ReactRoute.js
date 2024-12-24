import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import { ROUTES } from './RouteConstants';
import ChatPage from '../pages/ChatPage';

const ReactRoute = createBrowserRouter([
    {
        path: `${ROUTES.home}`,
        element: <HomePage />
    },
    {
        path: `${ROUTES.chat}`,
        element: <ChatPage />
    }
]);

export default ReactRoute