import { User, AuthState } from '../types';

// Default users - in production, this should be in a secure backend
const DEFAULT_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '2', 
    username: 'user',
    password: 'user123',
    role: 'user'
  }
];

class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  constructor() {
    this.loadUsers();
    this.loadCurrentUser();
  }

  private loadUsers() {
    const stored = localStorage.getItem('hr_users');
    if (stored) {
      this.users = JSON.parse(stored);
    } else {
      this.users = DEFAULT_USERS;
      this.saveUsers();
    }
  }

  private saveUsers() {
    localStorage.setItem('hr_users', JSON.stringify(this.users));
  }

  private loadCurrentUser() {
    const stored = localStorage.getItem('hr_current_user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }

  private saveCurrentUser() {
    if (this.currentUser) {
      localStorage.setItem('hr_current_user', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('hr_current_user');
    }
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      this.saveCurrentUser();
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    this.saveCurrentUser();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  getAuthState(): AuthState {
    return {
      isAuthenticated: this.isAuthenticated(),
      user: this.getCurrentUser()
    };
  }

  // Admin functions
  addUser(username: string, password: string, role: 'admin' | 'user'): boolean {
    if (!this.isAdmin()) return false;
    
    if (this.users.find(u => u.username === username)) {
      return false; // User already exists
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      role
    };

    this.users.push(newUser);
    this.saveUsers();
    return true;
  }

  updateUser(id: string, updates: Partial<User>): boolean {
    if (!this.isAdmin()) return false;

    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) return false;

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    this.saveUsers();
    return true;
  }

  deleteUser(id: string): boolean {
    if (!this.isAdmin()) return false;

    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    this.saveUsers();
    return true;
  }

  getAllUsers(): User[] {
    if (!this.isAdmin()) return [];
    return this.users;
  }
}

export const authService = new AuthService();