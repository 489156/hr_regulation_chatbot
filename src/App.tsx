import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginForm } from './components/LoginForm';
import { MainLayout } from './components/MainLayout';
import { authService } from './services/authService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const authState = authService.getAuthState();
    setIsAuthenticated(authState.isAuthenticated);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated ? (
          <MainLayout onLogout={handleLogout} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </div>
    </TooltipProvider>
  );
};

export default App;
