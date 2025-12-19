import React, { useState, useEffect } from 'react';
import { Project, Task, User } from '@/types';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, Circle, Plus, FileText, MessageSquare, MoreHorizontal, Upload, Image as ImageIcon, Monitor, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { talentXApi } from '@/api/talentXApi';
import { toast } from 'sonner';

interface ProjectDetailProps {
    project: Project;
    onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'team' | 'files' | 'srs' | 'design' | 'whiteboard'>('overview');
    const [srsContent, setSrsContent] = useState(project.srs_content || '');
    const [whiteboardUrl, setWhiteboardUrl] = useState(project.whiteboard_url || '');
    const queryClient = useQueryClient();

    useEffect(() => {
        setSrsContent(project.srs_content || '');
        setWhiteboardUrl(project.whiteboard_url || '');
    }, [project]);

    // Tasks Query
    const { data: tasks, isLoading: tasksLoading } = useQuery({
        queryKey: ['tasks', project.id],
        queryFn: async () => talentXApi.entities.Task.filter({ project_id: project.id })
    });

    // Update Task Mutation
    const updateTaskMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: Task['status'] }) => {
            return await talentXApi.entities.Task.update(id, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', project.id] });
            toast.success('Task updated');
        }
    });

    // Update Project Mutation
    const updateProjectMutation = useMutation({
        mutationFn: async (data: Partial<Project>) => {
            return await talentXApi.entities.Project.update(project.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success('Project updated');
        },
        onError: () => {
            toast.error('Failed to update project');
        }
    });

    const handleSaveSrs = () => {
        updateProjectMutation.mutate({ srs_content: srsContent });
    };

    const handleSaveWhiteboard = () => {
        updateProjectMutation.mutate({ whiteboard_url: whiteboardUrl });
    };

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
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Plus className="w-4 h-4 text-gray-400" />
                            </Button>
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

    const OverviewTab = () => (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Project Progress</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-[#1a1a2e]">{project.progress || 0}%</span>
                        <span className="text-sm text-gray-400">completed</span>
                    </div>
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${project.progress || 0}%` }} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Budget Usage</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-[#1a1a2e]">${project.budget_spent?.toLocaleString() || 0}</span>
                        <span className="text-sm text-gray-400">of ${project.total_budget?.toLocaleString() || 0}</span>
                    </div>
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${((project.budget_spent || 0) / (project.total_budget || 1)) * 100}%` }} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Next Milestone</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-[#1a1a2e] truncate">{project.next_milestone ? 'Beta Release' : 'None'}</span>
                        <span className="text-sm text-gray-400">
                            {project.next_milestone ? new Date(project.next_milestone).toLocaleDateString() : 'No upcoming milestones'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Recent Activity (Mock) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-lg text-[#1a1a2e] mb-6">Recent Activity</h3>
                <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-800">
                                    <span className="font-bold">Michael Torres</span> completed the task <span className="font-medium text-[#204ecf]">Homepage Design</span>
                                </p>
                                <span className="text-xs text-gray-400">2 hours ago</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const TeamTab = () => (
        <div className="grid md:grid-cols-2 gap-6">
            {project.team_members?.map((member) => (
                <div key={member.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <img
                        src={member.avatar_url || `https://ui-avatars.com/api/?name=${member.full_name}`}
                        alt={member.full_name}
                        className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                        <h3 className="font-bold text-[#1a1a2e]">{member.full_name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                    </div>
                    <Button variant="outline" size="icon">
                        <MessageSquare className="w-4 h-4" />
                    </Button>
                </div>
            ))}
            {(!project.team_members || project.team_members.length === 0) && (
                <div className="col-span-2 text-center py-12 text-gray-500">
                    No team members assigned yet.
                </div>
            )}
        </div>
    );

    const FilesTab = () => (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3].map((_, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-900">Project_Specs_v{i + 1}.pdf</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.4 MB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Michael Torres</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const SRSTab = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-[#1a1a2e]">Software Requirements Specification (SRS)</h3>
                    <Button
                        onClick={handleSaveSrs}
                        disabled={updateProjectMutation.isPending}
                        className="bg-[#204ecf] hover:bg-[#1a3da8] text-white"
                    >
                        <Save className="w-4 h-4 mr-2" /> Save SRS
                    </Button>
                </div>
                <textarea
                    rows={15}
                    value={srsContent}
                    onChange={(e) => setSrsContent(e.target.value)}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#204ecf] focus:border-transparent outline-none transition-all resize-none font-mono text-sm"
                    placeholder="Write your project requirements here..."
                />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-[#1a1a2e] mb-4">Upload SRS File</h3>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#204ecf] transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop SRS document (PDF, DOCX)</p>
                </div>
            </div>
        </div>
    );

    const DesignTab = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-[#1a1a2e] mb-4">System Design Diagram</h3>
                {project.design_diagram_url ? (
                    <div className="relative group">
                        <img src={project.design_diagram_url} alt="Design Diagram" className="w-full rounded-xl border border-gray-100" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                            <Button variant="secondary">Change Diagram</Button>
                        </div>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-[#204ecf] transition-colors cursor-pointer">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-500 font-medium">Upload System Design Diagram</p>
                        <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, SVG</p>
                    </div>
                )}
            </div>
        </div>
    );

    const WhiteboardTab = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-[#1a1a2e]">Interactive Whiteboard</h3>
                    <Button
                        onClick={handleSaveWhiteboard}
                        disabled={updateProjectMutation.isPending}
                        className="bg-[#204ecf] hover:bg-[#1a3da8] text-white"
                    >
                        <Save className="w-4 h-4 mr-2" /> Save Link
                    </Button>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Whiteboard URL (e.g. Miro, Excalidraw)</label>
                    <input
                        type="url"
                        value={whiteboardUrl}
                        onChange={(e) => setWhiteboardUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#204ecf] focus:border-transparent outline-none transition-all"
                        placeholder="https://miro.com/app/board/..."
                    />
                </div>
                <div className="aspect-video bg-gray-50 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center p-8">
                    <Monitor className="w-16 h-16 text-gray-300 mb-4" />
                    <h4 className="text-xl font-bold text-gray-700 mb-2">Presentation Mode</h4>
                    <p className="text-gray-500 max-w-md mb-6">Use this space to present your ideas to the core team. You can link an external whiteboard or use our built-in tools.</p>
                    {whiteboardUrl ? (
                        <Button className="bg-[#204ecf] hover:bg-[#1a3da8] text-white px-8" onClick={() => window.open(whiteboardUrl, '_blank')}>
                            Launch Whiteboard
                        </Button>
                    ) : (
                        <Button variant="outline" disabled>No Whiteboard Linked</Button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-gray-100">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#1a1a2e]">{project.name}</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <span className={`inline-block w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                                }`} />
                            <span className="capitalize">{project.status.replace('_', ' ')}</span>
                            <span>•</span>
                            <span>Started {new Date(project.start_date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Share</Button>
                    <Button className="bg-[#204ecf] hover:bg-[#1a3da8] text-white">
                        <Plus className="w-4 h-4 mr-2" /> Add Task
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-8 overflow-x-auto no-scrollbar">
                    {['overview', 'tasks', 'team', 'files', 'srs', 'design', 'whiteboard'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-4 text-sm font-medium capitalize transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-[#204ecf]' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab === 'srs' ? 'SRS' : tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#204ecf]"
                                />
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'tasks' && <KanbanBoard />}
                {activeTab === 'team' && <TeamTab />}
                {activeTab === 'files' && <FilesTab />}
                {activeTab === 'srs' && <SRSTab />}
                {activeTab === 'design' && <DesignTab />}
                {activeTab === 'whiteboard' && <WhiteboardTab />}
            </motion.div>
        </div>
    );
}
