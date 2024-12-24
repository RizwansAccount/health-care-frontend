import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactRoute from './reactRoute/ReactRoute';

const App = () => {
  return (
    <RouterProvider router={ReactRoute} />
  )
}

export default App