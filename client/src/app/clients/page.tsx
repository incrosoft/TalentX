import React from 'react';
import ClientsHero from '@/components/clients/ClientsHero';
import ClientStats from '@/components/clients/ClientStats';
import CaseStudiesGrid from '@/components/clients/CaseStudiesGrid';
import TestimonialsSection from '@/components/clients/TestimonialsSection';

export default function ClientsPage() {
    return (
        <main className="min-h-screen bg-white">
            <ClientsHero />
            <ClientStats />
            <CaseStudiesGrid />
            <TestimonialsSection />
        </main>
    );
}
