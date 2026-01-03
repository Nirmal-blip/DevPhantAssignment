"use client";

import { Calendar, Home, BarChart3, MessageSquare, User, Store, List, ShoppingBag, Users, Handshake, Info, LogOut } from "lucide-react";
import Image from "next/image";

export function Sidebar() {
  return (
    <div className="w-64 bg-[#ffff] min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#e54545] rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded"></div>
        </div>
        <span className="text-[#e54545] font-bold text-lg">PARTNER APP</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 text-[#050505] space-y-1">
        <NavItem icon={<Calendar className="w-5 h-5" />} label="Turf Booking" />
        <NavItem icon={<Home className="w-5 h-5" />} label="My Turf" />
        <NavItem icon={<BarChart3 className="w-5 h-5" />} label="Reports" />
        <NavItem icon={<MessageSquare className="w-5 h-5" />} label="My Feed" />
        <NavItem icon={<User className="w-5 h-5" />} label="Coaching" />
        
        {/* Ecommerce with submenu */}
        <div>
          <NavItem icon={<Store className="w-5 h-5" />} label="Ecommerce" />
          <div className="ml-8 mt-1 space-y-1">
            <NavItem 
              icon={<List className="w-4 h-4" />} 
              label="Product Listing" 
              active 
            />
            <NavItem icon={<ShoppingBag className="w-4 h-4" />} label="My Orders" />
          </div>
        </div>

        <NavItem icon={<Users className="w-5 h-5" />} label="Events" />
        <NavItem icon={<User className="w-5 h-5" />} label="My Contacts" />
        <NavItem icon={<Handshake className="w-5 h-5" />} label="Partners" />
        <NavItem icon={<Info className="w-5 h-5" />} label="Privacy Policy" />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            FS
          </div>
          <div className="flex-1">
            <p className="text-black text-sm font-medium">Fenil Shilodre</p>
            <p className="text-[#050505] text-xs">Venue Owner</p>
          </div>
          <button className="text-[#050505] hover:text-[#ae3939]">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
        ${active 
          ? "bg-[#cacaca] text-[#df5858]" 
          : "text-text-gray-300 hover:bg-gray-800 hover:text-white"
        }
      `}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}

