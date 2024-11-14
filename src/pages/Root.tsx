import { Outlet } from "react-router-dom";
import LoginPage from "./LoginPage";

function RootLayout() {
  return (
    <>
        <LoginPage />
        <main className="container mx-auto px-4 pt-4">
        <Outlet />
        </main>
    </>
  );
}

export default RootLayout;
