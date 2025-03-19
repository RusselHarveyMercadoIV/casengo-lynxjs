interface AuthService {
  login: (email: string, password: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  register: (email: string, password: string, name: string) => Promise<any>;
  logout: (sessionId: string) => Promise<any>;
}

declare const authService: AuthService;
export default authService;
