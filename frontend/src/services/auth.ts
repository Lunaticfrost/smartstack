import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    // Store token in localStorage
    this.setToken(response.data.token);
    
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    
    // Store token in localStorage
    this.setToken(response.data.token);
    
    return response.data;
  },

  logout(): void {
    // Clear token from localStorage
    localStorage.removeItem("token");
  },

  setToken(token: string): void {
    localStorage.setItem("token", token);
    
    // Set default Authorization header for axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  async verifyToken(): Promise<AuthResponse | null> {
    const token = this.getToken();
    
    if (!token) return null;

    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    } catch {
      // Token is invalid or expired
      this.logout();
      return null;
    }
  }
};

export default authService;