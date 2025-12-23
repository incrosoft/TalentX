'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { talentXApi } from '@/api/talentXApi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Building2, Users, DollarSign, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Pagination } from '@/components/ui/Pagination';
import EnhancedHero from '@/components/landing/EnhancedHero';

export default function BrowseAgencies() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data: agencies = [], isLoading } = useQuery({
        queryKey: ['agencies'],
        queryFn: () => talentXApi.entities.Agency.list(),
    });

    const filteredAgencies = agencies.filter(agency => {
        return !searchQuery ||
            agency.agency_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agency.services?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    // Reset to first page when search changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredAgencies.length / itemsPerPage);
    const paginatedAgencies = filteredAgencies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-[#f5f7fa]  pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <EnhancedHero />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] mb-4">
                        Top-Rated Agencies
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Partner with full-service agencies for complete project delivery and specialized expertise.
                    </p>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search agencies, services, or expertise..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-14 text-lg bg-white border-gray-200 shadow-lg rounded-full focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </motion.div>

                {/* Results Count */}
                <div className="mb-6 text-gray-600 font-medium">
                    Found <span className="text-[#1a1a2e]">{filteredAgencies.length}</span> agencies
                </div>

                {/* Agencies Grid */}
                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paginatedAgencies.map((agency, index) => (
                                <motion.div
                                    key={agency.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link href={createPageUrl(`agency-profile?id=${agency.id}`)}>
                                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-100 group cursor-pointer overflow-hidden flex flex-col">
                                            <div className="p-6 flex items-start gap-4 border-b border-gray-50">
                                                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 text-white">
                                                    <Building2 className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-[#1a1a2e] group-hover:text-primary transition-colors">
                                                        {agency.agency_name}
                                                    </h3>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="font-bold text-sm text-gray-900">{agency.rating || 5.0}</span>
                                                        <span className="text-gray-400 text-sm">/ 5.0</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <CardContent className="p-6 flex-1">
                                                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                                                    {agency.description || 'Full-service agency providing comprehensive solutions for enterprise clients.'}
                                                </p>

                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Users className="w-4 h-4 text-gray-400" />
                                                        <span>{agency.team_size}+ experts</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Briefcase className="w-4 h-4 text-gray-400" />
                                                        <span>{agency.completed_projects || 0} projects</span>
                                                    </div>
                                                    {agency.location && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                                                            <MapPin className="w-4 h-4 text-gray-400" />
                                                            <span>{agency.location}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {agency.services && agency.services.length > 0 && (
                                                    <div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Specialties</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {agency.services.slice(0, 3).map((service, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded-md font-medium border border-gray-100"
                                                                >
                                                                    {service}
                                                                </span>
                                                            ))}
                                                            {agency.services.length > 3 && (
                                                                <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs rounded-md font-medium border border-gray-100">
                                                                    +{agency.services.length - 3}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>

                                            <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-auto">
                                                {agency.min_project_size && (
                                                    <div className="text-xs font-medium text-gray-500">
                                                        Min. project: <span className="text-gray-900 font-bold">${agency.min_project_size.toLocaleString()}</span>
                                                    </div>
                                                )}
                                                <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 ml-auto">
                                                    View Agency <ChevronRight className="w-3.5 h-3.5" />
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

                {!isLoading && filteredAgencies.length === 0 && (
                    <div className="text-center py-16">
                        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No agencies found</h3>
                        <p className="text-gray-500">Try adjusting your search</p>
                    </div>
                )}
            </div>
        </div>
    );
}
