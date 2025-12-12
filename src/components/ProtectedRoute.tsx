import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  // Use `isLoaded` to check if Clerk is loaded
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
          <div className="text-slate-400">Loading...</div>
        </div>
      </div>
    );
  }

  // Use `isSignedIn` to protect the content
  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  // Use `user` to access the current user's data
  return <>{children}</>;
};

export default ProtectedRoute;