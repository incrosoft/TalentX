import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import MissionSection from '@/components/about/MissionSection';
import TeamGrid from '@/components/about/TeamGrid';
import StatsGrid from '@/components/about/StatsGrid';
import ImpactSection from '@/components/about/ImpactSection';

const founder = [
    {
        name: "Susmoy Debnath",
        role: "Founder",
        image: "/brain/1a935bd0-9de0-49e3-b202-5f568255f370/team_member_1_1766121234381.png"
    }
];

const executiveTeam = [
    {
        name: "Katelyn Donnelly",
        role: "Managing Director",
        image: "/brain/1a935bd0-9de0-49e3-b202-5f568255f370/team_member_2_1766121254561.png"
    },
    {
        name: "Adam D'Angelo",
        role: "Executive Advisor",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
    },
    {
        name: "D'Arcy Coolican",
        role: "VP of Operations",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop"
    }
];

const boardOfDirectors = [
    {
        name: "Andreessen Horowitz",
        role: "Investment Partner",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop"
    }
];

export default function AboutUs() {
    return (
        <main className="min-h-screen bg-white">
            <AboutHero />
            <MissionSection />
            <TeamGrid title="Founder" members={founder} />
            <StatsGrid />
            <TeamGrid title="Executive Team" members={executiveTeam} />
            <TeamGrid title="Board of Directors" members={boardOfDirectors} />
            <ImpactSection />
        </main>
    );
}
