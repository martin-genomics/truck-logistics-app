// components/Header.tsx
import React from "react";
import { Truck, MapPin } from "lucide-react"; // simple icons

interface HeaderProps {
  onOpenChange: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({onOpenChange}) => {
  return (
    <header className="bg-white/10 backdrop-blur-sm shadow-md rounded-2xl border border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + App Name */}
        <div className="flex items-center space-x-3">
          <Truck className="h-8 w-8 text-teal-500" />
          <h1 className="text-2xl font-bold text-gray-300">
            ELD Trip Planner
          </h1>
        </div>

        {/* Nav / Quick Links */}
        <nav className="hidden md:flex space-x-6 text-gray-300 font-medium">
          <a href="#schedule" className="hover:text-teal-600 transition">
            Daily Schedule
          </a>
          <a href="#logs" className="hover:text-teal-600 transition">
            Logs
          </a>
        </nav>

        {/* Call-to-Action */}
        <div className="flex items-center space-x-3">
        <button onClick={() => onOpenChange(true)} className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            New Trip
      </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
