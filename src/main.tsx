import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './pages/main/index.tsx';
import AddPlace from './pages/addPlace/index.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/novo",
    element: <AddPlace />
  }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
