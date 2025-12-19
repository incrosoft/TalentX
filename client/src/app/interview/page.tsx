'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, CheckCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';

interface Message {
    id: string;
    sender: 'ai' | 'user';
    content: string;
}

export default function InterviewPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            content: "Hi there! I'm TalentAI. I'll be conducting your initial screening today. To get started, could you please tell me your full name?"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const questions = [
        "Great to meet you! What is your primary area of expertise (e.g., React Developer, UX Designer)?",
        "How many years of professional experience do you have in this field?",
        "Could you briefly describe a challenging project you've worked on recently?",
        "What is your expected hourly rate (in USD)?",
        "Thanks! Finally, please provide a link to your portfolio or LinkedIn profile."
    ];

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            content: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            if (step < questions.length) {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    sender: 'ai',
                    content: questions[step]
                };
                setMessages(prev => [...prev, aiMessage]);
                setStep(prev => prev + 1);
            } else {
                const completionMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    sender: 'ai',
                    content: "Thank you! I've gathered all the necessary information. Our team will review your profile and get back to you within 48 hours. Redirecting you to the dashboard..."
                };
                setMessages(prev => [...prev, completionMessage]);

                setTimeout(() => {
                    toast.success("Application submitted successfully!");
                    router.push(createPageUrl('Dashboard'));
                }, 3000);
            }
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#00c853] rounded flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-[#1a1a2e]">TalentAI Interview</span>
                </div>
                <div className="text-sm text-gray-500">
                    Screening in progress...
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 max-w-3xl mx-auto w-full p-6 overflow-y-auto">
                <div className="space-y-6">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-[#00c853]' : 'bg-[#204ecf]'
                                    }`}>
                                    {msg.sender === 'ai' ? <Bot className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
                                </div>
                                <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.sender === 'ai'
                                        ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                        : 'bg-[#204ecf] text-white rounded-tr-none'
                                    }`}>
                                    <p className="leading-relaxed">{msg.content}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#00c853] flex items-center justify-center flex-shrink-0">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-6">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSendMessage} className="flex gap-4">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your answer..."
                            className="flex-1 h-12 text-lg"
                            autoFocus
                            disabled={isTyping}
                        />
                        <Button
                            type="submit"
                            disabled={!inputValue.trim() || isTyping}
                            className="h-12 w-12 rounded-full bg-[#204ecf] hover:bg-[#1a3da8] flex items-center justify-center"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
