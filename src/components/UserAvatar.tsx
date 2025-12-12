import React, { useState, useRef, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { LogOut, User } from 'lucide-react';

const UserAvatar: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center size-7 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors border border-primary/30"
      >
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="User avatar"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <User size={16} className="text-primary" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-4 w-52 bg-slate-900 border border-slate-800 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-slate-800">
            <p className="text-sm font-medium text-slate-100 truncate">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.emailAddresses[0]?.emailAddress || 'User'
              }
            </p>
            {user.emailAddresses[0]?.emailAddress && (
              <p className="text-xs text-slate-500 truncate">
                {user.emailAddresses[0].emailAddress}
              </p>
            )}
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors rounded-b-lg"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;