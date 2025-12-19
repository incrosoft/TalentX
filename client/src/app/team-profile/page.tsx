'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { talentXApi } from '@/api/talentXApi';
import { Button } from "@/components/ui/button";
import { Star, Users, DollarSign, Briefcase, ArrowLeft, Loader2, CheckCircle, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

function TeamProfileContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [teamId, setTeamId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTeamId(searchParams.get('id'));
    }, [searchParams]);

    const { data: team, isLoading } = useQuery({
        queryKey: ['team', teamId],
        queryFn: async () => {
            const teams = await talentXApi.entities.Team.list();
            return teams.find(t => t.id === teamId);
        },
        enabled: !!teamId
    });

    const handleHire = async () => {
        if (!team) return;
        setLoading(true);
        try {
            const user = await talentXApi.auth.me();

            const subscriptions = await talentXApi.entities.Subscription.filter({
                user_email: user.email,
                status: 'active'
            });

            if (subscriptions.length === 0) {
                toast.error('Please subscribe to hire teams');
                router.push(createPageUrl('Pricing'));
                return;
            }

            await talentXApi.entities.HireRequest.create({
                client_name: user.full_name,
                client_email: user.email,
                hire_type: 'team',
                category: team.specialization,
                matched_team_id: team.id,
                status: 'pending'
            });

            toast.success('Team hire request submitted!');
            router.push(createPageUrl('BrowseTeams'));
        } catch (error) {
            toast.error('Please log in to hire');
        } finally {
            setLoading(false);
        }
    };

    if (isLoading || !team) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading team profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f7fa] pt-20 pb-12">
            {/* Back Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <Link href={createPageUrl('BrowseTeams')} className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Teams</span>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">{team.team_name}</h1>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                                            {team.specialization?.replace(/_/g, ' ')}
                                        </span>
                                        {team.availability === 'available' && (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium flex items-center gap-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                Available Now
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-2xl font-bold text-[#1a1a2e]">${team.hourly_rate}<span className="text-sm text-gray-500 font-normal">/hr</span></div>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-gray-900">{team.rating || 5.0}</span>
                                        <span>({team.completed_projects || 0} projects)</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                {team.description || 'A cohesive unit of senior engineers and designers ready to tackle complex challenges. We specialize in rapid product development and scalable architecture.'}
                            </p>

                            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="font-bold text-[#1a1a2e] text-lg">{team.team_size}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Members</div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                                    <div className="font-bold text-[#1a1a2e] text-lg">Fast</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Velocity</div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                    <div className="font-bold text-[#1a1a2e] text-lg">100%</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Verified</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Team Members */}
                        {team.members && team.members.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                            >
                                <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">Team Composition</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {team.members.map((member, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-primary/20 hover:shadow-md transition-all bg-gray-50/50">
                                            <img
                                                src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'Member')}&size=100`}
                                                alt={member.name}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                            />
                                            <div>
                                                <h3 className="font-bold text-[#1a1a2e]">{member.name}</h3>
                                                <p className="text-sm text-primary font-medium">{member.role}</p>
                                                <p className="text-xs text-gray-500 mt-1">5+ years exp.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Action Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24"
                        >
                            <h3 className="font-bold text-[#1a1a2e] mb-4 text-lg">Hire this Team</h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Weekly Capacity</span>
                                    <span className="font-medium text-[#1a1a2e]">40 hrs/member</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Timezone</span>
                                    <span className="font-medium text-[#1a1a2e]">UTC-5 to UTC+1</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Start Date</span>
                                    <span className="font-medium text-[#1a1a2e]">Immediate</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleHire}
                                disabled={loading || team.availability !== 'available'}
                                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-primary/25"
                            >
                                {loading ? 'Processing...' : 'Hire Team Now'}
                            </Button>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                100% Satisfaction Guarantee. Cancel anytime.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TeamProfile() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <TeamProfileContent />
        </Suspense>
    );
}
