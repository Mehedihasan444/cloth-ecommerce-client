import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
   
    return (
        <div className="flex">
            <Sidebar  />
            <div className="min-h-screen flex-1 p-6 h-screen overflow-hidden overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;