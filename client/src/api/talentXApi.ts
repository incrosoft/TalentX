import axios from 'axios';
import { Talent, Agency, Team, Subscription, HireRequest, Project, Task, User, Message, UserRole } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('talentx_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('talentx_token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const talentXApi = {
    auth: {
        login: async (role: UserRole): Promise<User> => {
            // For demo purposes, we still use a simplified login but hit the real backend
            // In a real app, this would be a POST /auth/login with credentials
            // Here we'll use a hardcoded demo account based on the role
            let email = 'demo@example.com';
            if (role === 'talent') email = 'michael@example.com';
            if (role === 'agency') email = 'agency@example.com';
            if (role === 'admin') email = 'admin@talentx.com';

            const response = await apiClient.post('/auth/login', {
                email,
                password: 'password123'
            });

            const { user, token } = response.data;
            if (typeof window !== 'undefined') {
                localStorage.setItem('talentx_user', JSON.stringify(user));
                localStorage.setItem('talentx_token', token);
            }
            return user;
        },
        me: async (): Promise<User> => {
            try {
                const response = await apiClient.get('/auth/me');
                return response.data;
            } catch (error) {
                // Fallback to localStorage if API fails or not logged in
                if (typeof window !== 'undefined') {
                    const stored = localStorage.getItem('talentx_user');
                    if (stored) return JSON.parse(stored);
                }
                throw error;
            }
        },
        logout: async () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('talentx_user');
                localStorage.removeItem('talentx_token');
            }
        }
    },
    entities: {
        Talent: {
            list: async (): Promise<(Talent & { id: string })[]> => {
                const response = await apiClient.get('/talents');
                return response.data;
            }
        },
        Agency: {
            list: async (): Promise<(Agency & { id: string })[]> => {
                const response = await apiClient.get('/agencies');
                return response.data;
            }
        },
        Team: {
            list: async (): Promise<(Team & { id: string })[]> => {
                const response = await apiClient.get('/teams');
                return response.data;
            }
        },
        Subscription: {
            filter: async (query: any): Promise<Subscription[]> => {
                // Subscriptions are not fully implemented in backend yet, return mock
                return [{
                    user_email: 'demo@example.com',
                    status: 'active'
                }];
            },
            create: async (data: any) => ({ id: 'sub_123', ...data })
        },
        HireRequest: {
            create: async (data: any) => {
                const response = await apiClient.post('/hire-requests', data);
                return response.data;
            }
        },
        Project: {
            list: async (): Promise<Project[]> => {
                const response = await apiClient.get('/projects');
                return response.data;
            },
            filter: async (query: any): Promise<Project[]> => {
                const response = await apiClient.get('/projects', { params: query });
                return response.data;
            },
            create: async (data: any) => {
                const response = await apiClient.post('/projects', data);
                return response.data;
            },
            update: async (id: string, data: Partial<Project>) => {
                const response = await apiClient.patch(`/projects/${id}`, data);
                return response.data;
            }
        },
        Task: {
            list: async (): Promise<Task[]> => {
                const response = await apiClient.get('/tasks');
                return response.data;
            },
            filter: async (query: any): Promise<Task[]> => {
                const response = await apiClient.get('/tasks', { params: query });
                return response.data;
            },
            update: async (id: string, data: Partial<Task>) => {
                const response = await apiClient.patch(`/tasks/${id}`, data);
                return response.data;
            },
            create: async (data: any) => {
                const response = await apiClient.post('/tasks', data);
                return response.data;
            }
        },
        Message: {
            list: async (): Promise<Message[]> => {
                const response = await apiClient.get('/messages');
                return response.data;
            },
            filter: async (query: any): Promise<Message[]> => {
                const response = await apiClient.get('/messages');
                return response.data;
            },
            create: async (data: any) => {
                const response = await apiClient.post('/messages', data);
                return response.data;
            }
        },
        User: {
            list: async (): Promise<User[]> => {
                // Not implemented in backend yet
                return [
                    { id: 'demo_client', email: 'demo@example.com', full_name: 'Demo Client', role: 'client', avatar_url: 'https://ui-avatars.com/api/?name=Demo+Client' },
                    { id: '1', email: 'michael@example.com', full_name: 'Michael Torres', role: 'talent', avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop' },
                    { id: 'admin1', email: 'admin@talentx.com', full_name: 'Admin User', role: 'admin', avatar_url: 'https://ui-avatars.com/api/?name=Admin+User' }
                ];
            }
        }
    },
    integrations: {
        Core: {
            InvokeLLM: async (params: any) => {
                // Keep mock for LLM for now
                if (params.prompt.includes('team compositions')) {
                    return {
                        teams: [
                            {
                                team_name: "The A-Team",
                                talent_ids: ["1", "2", "3"],
                                rationale: "Perfect blend of frontend, backend, and design skills.",
                                hourly_rate: 250
                            },
                            {
                                team_name: "Innovation Squad",
                                talent_ids: ["4", "5", "6"],
                                rationale: "High expertise in AI and Data Science.",
                                hourly_rate: 300
                            },
                            {
                                team_name: "Rapid Launchers",
                                talent_ids: ["1", "3", "5"],
                                rationale: "Optimized for quick MVP delivery.",
                                hourly_rate: 200
                            }
                        ]
                    };
                }
                return {
                    matches: []
                };
            }
        }
    }
};
