import { Outlet } from "react-router-dom"
import {Navbar } from "../components/Navbar"
import {Footer } from "../components/Footer"


export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow p-4">
            <Outlet />
        </div>
        <Footer />
    </div>
  )
};

