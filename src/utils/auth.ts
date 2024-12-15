import { User } from '../types';

const ADMIN_USER: User = {
  username: 'aston',
  password: '$Aa31208',
  isAdmin: true,
};

export function authenticate(username: string, password: string): boolean {
  return username === ADMIN_USER.username && password === ADMIN_USER.password;
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem('isAuthenticated') === 'true';
}

export function login(username: string, password: string): boolean {
  if (authenticate(username, password)) {
    sessionStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem('isAuthenticated');
}