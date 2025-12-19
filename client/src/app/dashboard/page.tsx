'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { talentXApi } from '@/api/talentXApi';
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Clock, CheckCircle, Circle, AlertCircle, Search, Bell, Settings, LogOut, MessageSquare, Briefcase, Users, BarChart, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Project, Task, User, Message } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import ClientDashboard from '@/components/dashboard/ClientDashboard';

export default function Dashboard() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User | null>(null);
    const [activeView, setActiveView] = useState<'projects' | 'messages' | 'tasks' | 'users' | 'stats' | 'hire'>('projects');
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    // Initialize User
    useEffect(() => {
        talentXApi.auth.me().then(u => {
            setUser(u);
            // Set default view based on role
            if (u.role === 'talent') setActiveView('tasks');
            if (u.role === 'admin') setActiveView('stats');
        });
    }, []);

    const handleLogout = async () => {
        await talentXApi.auth.logout();
        router.push(createPageUrl('Login'));
    };

    // --- Queries ---

    // Projects
    const { data: projects, isLoading: projectsLoading } = useQuery({
        queryKey: ['projects', user?.id],
        queryFn: async () => {
            if (!user) return [];
            const allProjects = await talentXApi.entities.Project.filter({ client_email: user.email }); // Simplified filter
            if (allProjects.length > 0 && !selectedProject) {
                setSelectedProject(allProjects[0].id);
            }
            return allProjects;
        },
        enabled: !!user
    });

    // Tasks
    const { data: tasks, isLoading: tasksLoading } = useQuery({
        queryKey: ['tasks', selectedProject, user?.id],
        queryFn: async () => {
            if (user?.role === 'talent') {
                return await talentXApi.entities.Task.filter({ assignee: user.id });
            }
            if (!selectedProject) return [];
            return await talentXApi.entities.Task.filter({ project_id: selectedProject });
        },
        enabled: !!user
    });

    // Messages
    const { data: messages, isLoading: messagesLoading } = useQuery({
        queryKey: ['messages', user?.id],
        queryFn: async () => {
            if (!user) return [];
            return await talentXApi.entities.Message.filter({});
        },
        enabled: !!user && activeView === 'messages'
    });

    // Users (Admin only)
    const { data: allUsers, isLoading: usersLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return await talentXApi.entities.User.list();
        },
        enabled: !!user && user.role === 'admin' && activeView === 'users'
    });

    // --- Mutations ---

    const updateTaskMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: Task['status'] }) => {
            return await talentXApi.entities.Task.update(id, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task updated');
        }
    });

    const sendMessageMutation = useMutation({
        mutationFn: async (content: string) => {
            if (!user) return;
            return await talentXApi.entities.Message.create({
                sender_id: user.id,
                receiver_id: 'support', // Default to support for demo
                content,
                sender_name: user.full_name,
                sender_avatar: user.avatar_url
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            toast.success('Message sent');
        }
    });

    // --- Views ---

    const KanbanBoard = () => {
        const columns = [
            { id: 'todo', title: 'To Do', icon: Circle, color: 'text-gray-500' },
            { id: 'in_progress', title: 'In Progress', icon: Clock, color: 'text-blue-500' },
            { id: 'review', title: 'Review', icon: AlertCircle, color: 'text-yellow-500' },
            { id: 'done', title: 'Done', icon: CheckCircle, color: 'text-green-500' }
        ];

        return (
            <div className="grid md:grid-cols-4 gap-6 overflow-x-auto pb-4">
                {columns.map((col) => (
                    <div key={col.id} className="min-w-[280px]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <col.icon className={`w-5 h-5 ${col.color}`} />
                                <h3 className="font-bold text-gray-700">{col.title}</h3>
                                <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">
                                    {tasks?.filter(t => t.status === col.id).length || 0}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {tasks?.filter(t => t.status === col.id).map((task) => (
                                <motion.div
                                    key={task.id}
                                    layoutId={task.id}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-50 text-red-600' :
                                            task.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' :
                                                'bg-blue-50 text-blue-600'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-[#1a1a2e] mb-2">{task.title}</h4>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div className="flex -space-x-2">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${task.assignee || 'Unassigned'}&background=random`}
                                                className="w-6 h-6 rounded-full border-2 border-white"
                                                alt="Assignee"
                                            />
                                        </div>
                                        <div className="text-xs text-gray-400 font-medium">
                                            {task.due_date ? new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="mt-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {col.id !== 'todo' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-6 text-[10px] px-2"
                                                onClick={() => updateTaskMutation.mutate({ id: task.id, status: columns[columns.findIndex(c => c.id === col.id) - 1].id as any })}
                                            >
                                                Prev
                                            </Button>
                                        )}
                                        {col.id !== 'done' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-6 text-[10px] px-2 ml-auto"
                                                onClick={() => updateTaskMutation.mutate({ id: task.id, status: columns[columns.findIndex(c => c.id === col.id) + 1].id as any })}
                                            >
                                                Next
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const MessagesView = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-lg text-[#1a1a2e]">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.sender_id === user?.id ? 'flex-row-reverse' : ''}`}>
                        <img
                            src={msg.sender_avatar || `https://ui-avatars.com/api/?name=${msg.sender_name}`}
                            className="w-8 h-8 rounded-full"
                            alt={msg.sender_name}
                        />
                        <div className={`max-w-[70%] p-3 rounded-xl ${msg.sender_id === user?.id
                            ? 'bg-[#204ecf] text-white rounded-tr-none'
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                            }`}>
                            <p className="text-sm">{msg.content}</p>
                            <span className={`text-[10px] block mt-1 ${msg.sender_id === user?.id ? 'text-blue-200' : 'text-gray-400'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-200">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const input = (e.target as any).message;
                        if (input.value.trim()) {
                            sendMessageMutation.mutate(input.value);
                            input.value = '';
                        }
                    }}
                    className="flex gap-2"
                >
                    <input
                        name="message"
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#204ecf]"
                    />
                    <Button type="submit" className="bg-[#204ecf] hover:bg-[#1a3da8] text-white">Send</Button>
                </form>
            </div>
        </div>
    );

    const UsersView = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="font-bold text-lg text-[#1a1a2e]">User Management</h2>
            </div>
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {allUsers?.map((u) => (
                        <tr key={u.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img className="h-8 w-8 rounded-full" src={u.avatar_url} alt="" />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{u.full_name}</div>
                                        <div className="text-sm text-gray-500">{u.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                    {u.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Active
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-[#204ecf] hover:text-[#1a3da8]">Edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const StatsView = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Total Revenue</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#1a1a2e]">$124,500</span>
                    <span className="text-green-500 text-sm font-medium">+12%</span>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Active Projects</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#1a1a2e]">45</span>
                    <span className="text-green-500 text-sm font-medium">+5</span>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Total Users</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#1a1a2e]">1,234</span>
                    <span className="text-green-500 text-sm font-medium">+8%</span>
                </div>
            </div>
        </div>
    );

    const HireView = () => (
        <div className="grid md:grid-cols-3 gap-8">
            <Link href={createPageUrl('BrowseTalent')} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#204ecf] transition-all h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <UserIcon className="w-8 h-8 text-[#204ecf]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">Hire Freelancers</h3>
                    <p className="text-gray-500 mb-6">Find top 3% developers, designers, and finance experts for your projects.</p>
                    <Button variant="outline" className="mt-auto w-full group-hover:bg-[#204ecf] group-hover:text-white">Browse Talent</Button>
                </div>
            </Link>
            <Link href={createPageUrl('BrowseTeams')} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#204ecf] transition-all h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">Hire a Team</h3>
                    <p className="text-gray-500 mb-6">Get a full-stack team ready to start working on your project immediately.</p>
                    <Button variant="outline" className="mt-auto w-full group-hover:bg-purple-600 group-hover:text-white">Browse Teams</Button>
                </div>
            </Link>
            <Link href={createPageUrl('BrowseAgencies')} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#204ecf] transition-all h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Briefcase className="w-8 h-8 text-[#00c853]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">Hire an Agency</h3>
                    <p className="text-gray-500 mb-6">Partner with top development and design agencies for large-scale projects.</p>
                    <Button variant="outline" className="mt-auto w-full group-hover:bg-[#00c853] group-hover:text-white">Browse Agencies</Button>
                </div>
            </Link>
        </div>
    );

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (user.role === 'client') {
        return (
            <ClientDashboard
                user={user}
                onLogout={handleLogout}
                activeView={activeView}
                setActiveView={setActiveView}
                MessagesView={MessagesView}
                HireView={HireView}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href={createPageUrl('Home')} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#00c853] rounded flex items-center justify-center">
                                <span className="text-white font-bold text-sm">TX</span>
                            </div>
                            <span className="text-xl font-bold text-[#1a1a2e]">TalentX</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            {user.role === 'talent' && (
                                <>
                                    <button onClick={() => setActiveView('tasks')} className={`font-medium py-5 border-b-2 ${activeView === 'tasks' ? 'border-[#204ecf] text-[#1a1a2e]' : 'border-transparent text-gray-500'}`}>My Tasks</button>
                                    <button onClick={() => setActiveView('messages')} className={`font-medium py-5 border-b-2 ${activeView === 'messages' ? 'border-[#204ecf] text-[#1a1a2e]' : 'border-transparent text-gray-500'}`}>Messages</button>
                                </>
                            )}
                            {user.role === 'admin' && (
                                <>
                                    <button onClick={() => setActiveView('stats')} className={`font-medium py-5 border-b-2 ${activeView === 'stats' ? 'border-[#204ecf] text-[#1a1a2e]' : 'border-transparent text-gray-500'}`}>Overview</button>
                                    <button onClick={() => setActiveView('users')} className={`font-medium py-5 border-b-2 ${activeView === 'users' ? 'border-[#204ecf] text-[#1a1a2e]' : 'border-transparent text-gray-500'}`}>Users</button>
                                    <button onClick={() => setActiveView('messages')} className={`font-medium py-5 border-b-2 ${activeView === 'messages' ? 'border-[#204ecf] text-[#1a1a2e]' : 'border-transparent text-gray-500'}`}>Support</button>
                                </>
                            )}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="w-5 h-5 text-gray-500" />
                        </Button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-[#1a1a2e]">{user.full_name}</div>
                                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                            </div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                                <img src={user.avatar_url} alt="User" />
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleLogout}>
                                <LogOut className="w-5 h-5 text-gray-500" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {activeView === 'projects' && (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold text-[#1a1a2e]">Project Board</h1>
                            <Button className="bg-[#204ecf] hover:bg-[#1a3da8] text-white">
                                <Plus className="w-4 h-4 mr-2" /> New Task
                            </Button>
                        </div>
                        <KanbanBoard />
                    </>
                )}

                {activeView === 'tasks' && (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold text-[#1a1a2e]">My Assigned Tasks</h1>
                        </div>
                        <KanbanBoard />
                    </>
                )}

                {activeView === 'messages' && <MessagesView />}

                {activeView === 'users' && <UsersView />}

                {activeView === 'stats' && (
                    <>
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-[#1a1a2e]">Platform Overview</h1>
                        </div>
                        <StatsView />
                    </>
                )}

                {activeView === 'hire' && (
                    <>
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-[#1a1a2e]">Start Hiring</h1>
                            <p className="text-gray-500">Choose how you want to build your team</p>
                        </div>
                        <HireView />
                    </>
                )}
            </div>
        </div>
    );
}
