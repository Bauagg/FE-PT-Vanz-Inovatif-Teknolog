import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Dasboard from "../pages/admin/dasboard";
import Home from "../pages/member/home";
import DetailFruit from "../pages/member/detail-fruit";
import HomeAdmin from "../pages/admin/home-admin";
import FruitAdmin from "../pages/admin/fruit-admin";
import DetailFruitAdmin from "../pages/admin/detail-fruid-admin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dasboard",
        element: <Dasboard />,
        children: [
            {
                path: "",
                element: <HomeAdmin />,
            },
            {
                path: "fruit-admin",
                element: <FruitAdmin />,
            },
            {
                path: "detail-fruit-admin/:id",
                element: <DetailFruitAdmin />,
            },
        ],
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/detail-fruit/:id",
        element: <DetailFruit />
    }
])