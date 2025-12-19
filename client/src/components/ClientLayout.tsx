'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Pages where Navbar and Footer should be hidden
    const hideNavAndFooter = pathname?.startsWith('/dashboard') || pathname?.startsWith('/interview');

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {!hideNavAndFooter && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!hideNavAndFooter && <Footer />}
        </div>
    );
}
