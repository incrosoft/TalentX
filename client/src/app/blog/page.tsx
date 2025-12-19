import React from 'react';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

const blogPosts = [
    {
        title: 'How to Hire the Best Remote Developers',
        excerpt: 'A comprehensive guide to finding and hiring top remote development talent.',
        date: '2024-01-15',
        author: 'Sarah Johnson',
        category: 'Hiring'
    },
    {
        title: 'The Future of Remote Work in 2024',
        excerpt: 'Exploring trends and predictions for the remote work landscape.',
        date: '2024-01-10',
        author: 'Michael Chen',
        category: 'Remote Work'
    },
    {
        title: 'Building High-Performance Teams',
        excerpt: 'Strategies for creating and managing successful remote teams.',
        date: '2024-01-05',
        author: 'Emily Rodriguez',
        category: 'Team Management'
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] mb-4">
                        TalentX Blog
                    </h1>
                    <p className="text-xl text-gray-600">
                        Insights, tips, and stories from the world of remote work
                    </p>
                </div>

                <div className="space-y-8">
                    {blogPosts.map((post) => (
                        <article key={post.title} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                <span className="px-3 py-1 bg-blue-50 text-[#204ecf] rounded-full font-medium">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>{post.author}</span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <a href="#" className="text-[#204ecf] hover:underline font-medium">
                                Read more →
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
