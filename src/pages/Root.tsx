import { Outlet } from "react-router-dom";
import Login from "./LoginPage";

function RootLayout() {
  return (
    <>
        <Login />
        <main className="container mx-auto px-4 pt-4">
        <Outlet />
        </main>
    </>
  );
}

export default RootLayout;
