import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Settings, LogOut } from 'lucide-react';

interface UserProfileProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar?: string;
  };
}

const UserProfile = ({ 
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  }
}: UserProfileProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = () => {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Circle */}
      <Link 
        to="/settings"
        className="block w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-white/20 hover:ring-white/40"
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="select-none">{getInitials()}</span>
        )}
      </Link>

      {/* Hover Popup */}
      <div 
        className={`absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 origin-top-right ${
          isHovered 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
        style={{
          transformOrigin: 'top right',
        }}
      >
        {/* Arrow */}
        <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-slate-200 transform rotate-45"></div>

        {/* Header Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-5 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-white/50">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>{getInitials()}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-lg truncate">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Account Settings</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-5 space-y-3">
          <div className="flex items-start gap-3 group">
            <div className="mt-0.5 p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <Mail className="w-4 h-4 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 font-medium mb-0.5">Email</p>
              <p className="text-sm text-slate-900 truncate font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="mt-0.5 p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <Phone className="w-4 h-4 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 font-medium mb-0.5">Phone</p>
              <p className="text-sm text-slate-900 font-medium">{user.phone}</p>
            </div>
          </div>
        </div>

      
       
      </div>
    </div>
  );
};

export default UserProfile;