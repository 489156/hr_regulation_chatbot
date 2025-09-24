import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Settings, 
  LogOut, 
  User, 
  Shield,
  Menu,
  X
} from 'lucide-react';
import { authService } from '../services/authService';
import { ChatInterface } from './ChatInterface';
import { AdminPanel } from './AdminPanel';
import { toast } from '@/hooks/use-toast';

interface MainLayoutProps {
  onLogout: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<'chat' | 'admin'>('chat');
  const [user, setUser] = useState(authService.getCurrentUser());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    toast({
      title: "로그아웃",
      description: "성공적으로 로그아웃되었습니다.",
    });
    onLogout();
  };

  const navigation = [
    {
      id: 'chat',
      name: 'Q&A 챗봇',
      icon: MessageCircle,
      description: '규정 검색 및 질문'
    },
    ...(user?.role === 'admin' ? [{
      id: 'admin' as const,
      name: '관리자 패널',
      icon: Settings,
      description: '규정 및 사용자 관리'
    }] : [])
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h1 className="text-lg font-bold text-gray-900">HR Q&A 시스템</h1>
              <p className="text-xs text-gray-500">사내 규정 관리</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                {user?.role === 'admin' ? (
                  <Shield className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <div className="font-medium text-sm">{user?.username}</div>
                <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                  {user?.role === 'admin' ? '관리자' : '일반사용자'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                      ${currentView === item.id 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <h2 className="font-semibold text-gray-900">
              {navigation.find(nav => nav.id === currentView)?.name}
            </h2>
            <div className="w-8" /> {/* Spacer */}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {currentView === 'chat' && (
            <div className="h-full bg-white">
              <ChatInterface />
            </div>
          )}
          
          {currentView === 'admin' && user?.role === 'admin' && (
            <div className="h-full overflow-y-auto bg-gray-50">
              <AdminPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};