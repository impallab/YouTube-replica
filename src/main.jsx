import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import store from "./utils/store.js";
import { Home, Watch, Navbar, Feed,Shorts,Subscription } from "./components/index.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Feed />
      },
      {
        path: "watch",
        element: <Watch />
      },
      {
        path: "shorts",
        element: <Shorts />
      },
      {
        path: "subscription",
        element: <Subscription />
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Navbar />
    <RouterProvider router={router} />
  </Provider>
)
