import { Outlet } from "react-router-dom";

import Header from "./Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container px-10 bg-gray-200 min-h-161 pt-10 ">
          <Outlet />
        </div>
      </main>
    </>
  );
}
