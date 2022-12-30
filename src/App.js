import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PostDetails from "./components/media/PostDetails";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Media from "./pages/Media";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/media",
      element: <Media/>,
    },
    {
      path: "/media/:id",
      element: <PostDetails/>,
    },
    {
      path: "/about",
      element: <About/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Register/>,
    },
  ]);

  return (
    <div className="">
      <RouterProvider router={router} />
      <ToastContainer/>
    </div>
  );
}

export default App;
