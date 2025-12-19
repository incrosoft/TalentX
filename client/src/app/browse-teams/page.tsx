'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { talentXApi } from '@/api/talentXApi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Users, Star, ArrowRight, Loader2, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';
import { Talent, Team } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import AIMatchingModal from '@/components/AIMatchingModal';

import { Pagination } from '@/components/ui/Pagination';

export default function BrowseTeams() {
    const router = useRouter();
    const [generating, setGenerating] = useState(false);
    const [generatedTeams, setGeneratedTeams] = useState<(Omit<Team, 'members'> & { rationale?: string, members?: Talent[] })[]>([]);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [requirements, setRequirements] = useState({
        projectDescription: '',
        teamSize: '3-5',
        skills: '',
        budget: '',
        duration: ''
    });

    // Pagination for existing teams
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data: talents = [] } = useQuery({
        queryKey: ['talents'],
        queryFn: () => talentXApi.entities.Talent.list(),
    });

    const { data: existingTeams = [], isLoading: isLoadingTeams } = useQuery({
        queryKey: ['teams'],
        queryFn: () => talentXApi.entities.Team.list(),
    });

    // Calculate pagination for existing teams
    const totalPages = Math.ceil(existingTeams.length / itemsPerPage);
    const paginatedTeams = existingTeams.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleGenerateTeams = async () => {
        if (!requirements.projectDescription || !requirements.skills) {
            toast.error('Please provide project description and required skills');
            return;
        }

        setGenerating(true);
        try {
            const user = await talentXApi.auth.me();

            // Check subscription
            const subscriptions = await talentXApi.entities.Subscription.filter({
                user_email: user.email,
                status: 'active'
            });

            if (subscriptions.length === 0) {
                toast.error('Please subscribe to generate teams');
                router.push(createPageUrl('Pricing'));
                return;
            }

            // Use AI to generate team recommendations
            const prompt = `Based on the following project requirements and available talents, suggest 3 optimal team compositions.
 
Project Description: ${requirements.projectDescription}
Required Skills: ${requirements.skills}
Team Size: ${requirements.teamSize} members
Budget: ${requirements.budget || 'Flexible'}
Duration: ${requirements.duration || 'Not specified'}
 
Available Talents:
${talents.map(t => `- ${t.full_name}: ${t.title} | Skills: ${t.skills?.join(', ')} | Rate: $${t.hourly_rate}/hr | Experience: ${t.experience_years} years`).join('\n')}
 
For each team, provide:
1. Team name (creative and relevant)
2. Selected talent IDs (from available talents that best match requirements)
3. Why this team composition works
4. Estimated hourly rate for the team
 
Consider skill complementarity, experience levels, and budget constraints.`;

            const result = await talentXApi.integrations.Core.InvokeLLM({
                prompt: prompt,
                response_json_schema: {
                    type: "object",
                    properties: {
                        teams: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    team_name: { type: "string" },
                                    talent_ids: { type: "array", items: { type: "string" } },
                                    rationale: { type: "string" },
                                    hourly_rate: { type: "number" }
                                }
                            }
                        }
                    }
                }
            }) as unknown as { teams: any[] };

            // Map talent IDs to actual talent objects
            const teams = result.teams.map((team: any) => ({
                ...team,
                members: team.talent_ids.map((id: string) => talents.find(t => t.id === id)).filter(Boolean) as Talent[]
            }));

            setGeneratedTeams(teams);
            toast.success('Teams generated successfully!');
        } catch (error) {
            toast.error('Please log in to generate teams');
        } finally {
            setGenerating(false);
        }
    };

    const handleHireTeam = async (team: any) => {
        try {
            const user = await talentXApi.auth.me();

            await talentXApi.entities.HireRequest.create({
                client_name: user.full_name,
                client_email: user.email,
                hire_type: 'team',
                project_description: requirements.projectDescription,
                category: requirements.skills,
                status: 'pending'
            });

            toast.success('Team hire request submitted!');
            router.push(createPageUrl('Home'));
        } catch (error) {
            toast.error('Failed to submit hire request');
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f7fa] pt-24 pb-12">
            <AIMatchingModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} mode="team" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 relative"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] mb-4">
                        AI-Powered Team Builder
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Tell us your requirements and we'll match the perfect team for your project using our advanced AI matching engine.
                    </p>
                    <div className="absolute top-0 right-0 hidden md:block">
                        <Button
                            onClick={() => setIsAIModalOpen(true)}
                            className="bg-[#00c853] hover:bg-[#009624] text-white font-bold py-3 px-5 rounded-lg shadow-lg flex items-center gap-2 animate-pulse"
                        >
                            <Sparkles className="w-5 h-5" />
                            AI Matcher
                        </Button>
                    </div>
                    {/* Mobile Button */}
                    <div className="mt-6 md:hidden">
                        <Button
                            onClick={() => setIsAIModalOpen(true)}
                            className="bg-[#00c853] hover:bg-[#009624] text-white font-bold py-3 px-5 rounded-lg shadow-lg flex items-center gap-2 w-full justify-center"
                        >
                            <Sparkles className="w-5 h-5" />
                            AI Matcher
                        </Button>
                    </div>
                </motion.div>

                {/* Requirements Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 mb-12 max-w-4xl mx-auto"
                >
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#1a1a2e]">Project Requirements</h2>
                            <p className="text-sm text-gray-500">Define what you need, and we'll handle the rest.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Project Description *
                            </label>
                            <Textarea
                                placeholder="Describe your project, goals, and what you want to build..."
                                value={requirements.projectDescription}
                                onChange={(e) => setRequirements({ ...requirements, projectDescription: e.target.value })}
                                className="h-32 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Required Skills *
                            </label>
                            <Input
                                placeholder="e.g., React, Node.js, UI/UX Design, AWS"
                                value={requirements.skills}
                                onChange={(e) => setRequirements({ ...requirements, skills: e.target.value })}
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors h-12"
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Team Size
                                </label>
                                <Select
                                    value={requirements.teamSize}
                                    onValueChange={(value) => setRequirements({ ...requirements, teamSize: value })}
                                >
                                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2-3">2-3 members</SelectItem>
                                        <SelectItem value="3-5">3-5 members</SelectItem>
                                        <SelectItem value="5-8">5-8 members</SelectItem>
                                        <SelectItem value="8+">8+ members</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Budget Range
                                </label>
                                <Input
                                    placeholder="e.g., $5000-10000"
                                    value={requirements.budget}
                                    onChange={(e) => setRequirements({ ...requirements, budget: e.target.value })}
                                    className="bg-gray-50 border-gray-200 focus:bg-white transition-colors h-12"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Project Duration
                                </label>
                                <Input
                                    placeholder="e.g., 3 months"
                                    value={requirements.duration}
                                    onChange={(e) => setRequirements({ ...requirements, duration: e.target.value })}
                                    className="bg-gray-50 border-gray-200 focus:bg-white transition-colors h-12"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleGenerateTeams}
                            disabled={generating}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 mt-4"
                        >
                            {generating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Analyzing Requirements & Matching Talent...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Generate Team Recommendations
                                </>
                            )}
                        </Button>
                    </div>
                </motion.div>

                {/* Generated Teams */}
                {generatedTeams.length > 0 && (
                    <div className="space-y-8 mb-20">
                        <div className="flex items-center gap-3">
                            <div className="h-px bg-gray-200 flex-1"></div>
                            <h2 className="text-2xl font-bold text-[#1a1a2e]">
                                Recommended Teams
                            </h2>
                            <div className="h-px bg-gray-200 flex-1"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {generatedTeams.map((team, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-primary flex flex-col overflow-hidden">
                                        <div className="bg-gray-50 p-6 border-b border-gray-100">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary">
                                                    <Users className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-[#1a1a2e] leading-tight">{team.team_name}</h3>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                        <span>Top Match</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <CardContent className="p-6 flex-1">
                                            <div className="mb-6">
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Why this team works</h4>
                                                <p className="text-gray-600 text-sm leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                                                    {team.rationale}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Team Members</h4>
                                                <div className="space-y-3">
                                                    {team.members?.map((member, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                                            <img
                                                                src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&size=100`}
                                                                alt={member.full_name}
                                                                className="w-10 h-10 rounded-full border border-gray-200"
                                                            />
                                                            <div>
                                                                <div className="font-semibold text-sm text-gray-900">{member.full_name}</div>
                                                                <div className="text-xs text-gray-500">{member.title}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-4">
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-sm text-gray-600 font-medium">Total Rate</span>
                                                <span className="text-xl font-bold text-[#1a1a2e]">${team.hourly_rate}/hr</span>
                                            </div>

                                            <Button
                                                onClick={() => handleHireTeam(team)}
                                                className="w-full bg-secondary hover:bg-secondary-hover text-white font-bold py-5 rounded-xl shadow-lg shadow-green-500/20"
                                            >
                                                Hire This Team
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Existing Teams Section */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <h2 className="text-2xl font-bold text-[#1a1a2e]">
                            Browse Existing Teams
                        </h2>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    {isLoadingTeams ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100"></div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedTeams.map((team, index) => (
                                    <motion.div
                                        key={team.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link href={createPageUrl(`team-profile?id=${team.id}`)}>
                                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-primary flex flex-col overflow-hidden">
                                                <div className="bg-gray-50 p-6 border-b border-gray-100">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary">
                                                            <Users className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-[#1a1a2e] leading-tight">{team.team_name}</h3>
                                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                                <span className="font-bold text-sm text-gray-900">{team.rating || 5.0}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <CardContent className="p-6 flex-1">
                                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                                                        {team.description}
                                                    </p>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-500">Specialization</span>
                                                            <span className="font-semibold text-[#1a1a2e] capitalize">{team.specialization.replace(/_/g, ' ')}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-500">Team Size</span>
                                                            <span className="font-semibold text-[#1a1a2e]">{team.team_size} members</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-500">Location</span>
                                                            <span className="font-semibold text-[#1a1a2e]">{team.location}</span>
                                                        </div>
                                                    </div>
                                                </CardContent>

                                                <CardFooter className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                                    <span className="text-xl font-bold text-[#1a1a2e]">${team.hourly_rate}/hr</span>
                                                    <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                                        View Team <ChevronRight className="w-3.5 h-3.5" />
                                                    </span>
                                                </CardFooter>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

