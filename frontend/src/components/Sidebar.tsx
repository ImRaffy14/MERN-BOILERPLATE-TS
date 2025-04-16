import { useState } from "react";
import { 
    Calendar, 
    CreditCard, 
    Users, 
    Settings, 
    BarChart3, 
    LogOut, 
    Menu, 
} from "lucide-react";

import { Button } from '@/components/ui/button';

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState("dashboard");

    const menuItems = [
        { id: "dashboard", icon: <BarChart3 size={20} />, label: "Dashboard" },
        { id: "users", icon: <Users size={20} />, label: "Users" },
        { id: "payments", icon: <CreditCard size={20} />, label: "Payments" },
        { id: "calendar", icon: <Calendar size={20} />, label: "Calendar" },
        { id: "settings", icon: <Settings size={20} />, label: "Settings" },
    ];

    return (
        <div className={`bg-white border-r ${collapsed ? "w-16" : "w-64"} flex flex-col transition-all duration-300`}>
            <div className="p-4 flex items-center justify-between border-b">
                {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
                <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
                    <Menu size={20} />
                </Button>
            </div>
            
            <div className="flex-1 py-4">
                <nav className="px-2 space-y-1">
                    {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} px-3 py-2 w-full rounded-md ${
                        activeItem === item.id 
                            ? "bg-blue-100 text-blue-700" 
                            : "text-gray-700 hover:bg-gray-100"
                        } transition-colors duration-200`}
                        onClick={() => setActiveItem(item.id)}
                    >
                        <span className="flex-shrink-0">{item.icon}</span>
                        {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
                    </button>
                    ))}
                </nav>
            </div>
            
            <div className="p-4 border-t">
                <button className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} w-full text-red-600 hover:bg-red-50 px-3 py-2 rounded-md`}>
                    <LogOut size={20} />
                    {!collapsed && <span className="ml-3 font-medium">Logout</span>}
                </button>
            </div>
        </div>
    )
}

export default Sidebar
