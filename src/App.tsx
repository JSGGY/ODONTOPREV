import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import RootLayout from "./pages/Root";
import Login from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "login",
        element: <Login />
      }
    ]

  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App

