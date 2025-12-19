import React from 'react';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

const footerLinks = {
    'Hire Talent': [
        { label: 'Hire Freelance Developers', url: 'BrowseTalent?category=developer' },
        { label: 'Hire Freelance Designers', url: 'BrowseTalent?category=designer' },
        { label: 'Hire Freelance Marketers', url: 'BrowseTalent?category=marketing' },
        { label: 'Hire Freelance Finance Experts', url: 'BrowseTalent?category=finance' },
        { label: 'Hire Product Managers', url: 'BrowseTalent?category=product_manager' },
        { label: 'Hire Project Managers', url: 'BrowseTalent?category=project_manager' }
    ],
    'Company': [
        { label: 'About Us', url: 'AboutUs' },
        { label: 'Careers', url: 'AboutUs' },
        { label: 'Blog', url: 'Blog' },
        { label: 'Press Center', url: 'AboutUs' },
        { label: 'Integrations', url: 'AboutUs' }
    ],
    'Contact': [
        { label: 'Contact Us', url: 'HelpCenter' },
        { label: 'Help Center', url: 'HelpCenter' },
        { label: 'FAQ', url: 'HelpCenter' }
    ]
};

export default function Footer() {
    return (
        <footer className="bg-[#262D3D] text-white font-sans">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href={createPageUrl('Home')} className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-[#00c853] rounded flex items-center justify-center">
                                <span className="text-white font-bold text-sm">TX</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">TalentX</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                            TalentX is an exclusive network of the top freelance software developers, designers, finance experts, product managers, and project managers in the world. Top companies hire TalentX freelancers for their most important projects.
                        </p>
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-6 text-gray-300">
                                {title}
                            </h3>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={createPageUrl(link.url)}
                                            className="text-gray-400 text-sm hover:text-[#00c853] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 bg-[#202634]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-8">
                            <p className="text-gray-500 text-sm">
                                © 2010 - 2024 TalentX, LLC. All rights reserved.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            <Link href={createPageUrl('Privacy')} className="text-gray-500 text-sm hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href={createPageUrl('Terms')} className="text-gray-500 text-sm hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Globe className="w-4 h-4" />
                                <span>English (US)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}