const API_BASE_URL = 'http://localhost:5000/api';

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  created_at?: string;
}

export interface Vehicle {
  id: string | number;
  owner_id: string | number;
  vehicle_name: string;
  vehicle_type: string;
  vehicle_number: string;
  price_first_10km: number;
  price_per_km_after: number;
  availability: 'available' | 'rented';
  approval_status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  owner_name?: string;
}

export interface RentalRequest {
  id: string | number;
  user_id: string | number;
  vehicle_id: string | number;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  vehicle?: Vehicle;
  user_name?: string;
  vehicle_name?: string;
  customer_name?: string;
}

class APIService {
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private async request(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  }

  // Auth APIs
  async login(email: string, password: string): Promise<{ token: string; id: number; name: string; email: string; role: string }> {
    return this.request('/auth/login', 'POST', { email, password });
  }

  async register(name: string, email: string, password: string, role: 'user' | 'owner'): Promise<{ message: string; id?: number; token?: string }> {
    return this.request('/auth/register', 'POST', { name, email, password, role });
  }

  // Vehicle APIs
  async getVehicles(): Promise<Vehicle[]> {
    return this.request('/vehicles', 'GET');
  }

  async getVehicle(id: string | number): Promise<Vehicle> {
    return this.request(`/vehicles/${id}`, 'GET');
  }

  async addVehicle(data: Partial<Vehicle>): Promise<{ id: number; message: string }> {
    return this.request('/vehicles', 'POST', data);
  }

  async updateVehicle(id: string | number, data: Partial<Vehicle>): Promise<{ message: string }> {
    return this.request(`/vehicles/${id}`, 'PUT', data);
  }

  async deleteVehicle(id: string | number): Promise<{ message: string }> {
    return this.request(`/vehicles/${id}`, 'DELETE');
  }

  // Rental APIs
  async requestRental(vehicle_id: string | number, start_date: string, end_date: string): Promise<{ id: number; message: string }> {
    return this.request('/rentals', 'POST', { vehicle_id, start_date, end_date });
  }

  async getRentals(): Promise<RentalRequest[]> {
    return this.request('/rentals', 'GET');
  }

  async updateRentalStatus(id: string | number, status: 'approved' | 'rejected'): Promise<{ message: string }> {
    return this.request(`/rentals/${id}/status`, 'PUT', { status });
  }

  // Admin APIs
  async getAllVehicles(): Promise<Vehicle[]> {
    return this.request('/admin/vehicles', 'GET');
  }

  async getAllUsers(): Promise<User[]> {
    return this.request('/admin/users', 'GET');
  }

  async approveVehicle(id: string | number): Promise<{ message: string }> {
    return this.request(`/admin/vehicles/${id}/approve`, 'PUT', {});
  }

  async rejectVehicle(id: string | number): Promise<{ message: string }> {
    return this.request(`/admin/vehicles/${id}/reject`, 'PUT', {});
  }
}

export const api = new APIService();
