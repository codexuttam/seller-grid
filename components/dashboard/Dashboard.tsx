"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { AlertCircle, ArrowUpRight, BarChart3, Globe, MessageSquare, Star, TrendingUp, Users } from "lucide-react";
import { cn } from "@/components/utils";
import SentimentSphere from "./SentimentSphere";
import ReviewFeed from "./ReviewFeed";

const metrics = [
    { label: "Total Reviews", value: "12.4k", change: "+14%", icon: MessageSquare, color: "text-blue-400" },
    { label: "Avg Rating", value: "4.8", change: "+0.2", icon: Star, color: "text-yellow-400" },
    { label: "Response Rate", value: "98%", change: "+5%", icon: Globe, color: "text-green-400" },
    { label: "Mention Count", value: "3.2k", change: "+12%", icon: Users, color: "text-purple-400" },
];

const platforms = [
    { name: "Amazon", score: 4.9, reviews: 5420, trend: "up" },
    { name: "Google Business", score: 4.7, reviews: 3100, trend: "up" },
    { name: "Shopify Store", score: 4.8, reviews: 2800, trend: "stable" },
    { name: "Facebook", score: 4.5, reviews: 1100, trend: "down" },
];

const insights = [
    { title: "Shipping Delays", description: "Customers in Europe reporting longer delivery times on average", severity: "high" },
    { title: "Material Quality", description: "Positive feedback on the new vegan leather texture usage", severity: "positive" },
    { title: "Pricing Concern", description: "Some customers comparison shopping with competitor 'Store X'", severity: "medium" },
];

export default function Dashboard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animations
            gsap.from(".dashboard-header", {
                y: -30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(".metric-card", {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
            });

            gsap.from(".main-card", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-indigo-500 selection:text-white">
            {/* Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full animate-blob" />
                <div className="absolute bottom-[5%] right-[0%] w-[350px] h-[350px] bg-purple-600/10 blur-[140px] rounded-full animate-blob animation-delay-2000" />
            </div>

            <nav className="dashboard-header flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">ReviewIQ <span className="text-indigo-400">Pro</span></h1>
                </div>
                <div className="flex items-center gap-6">
                    <button className="hidden md:block text-zinc-400 hover:text-white transition-colors">Settings</button>
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-all">
                        <Users className="w-5 h-5 text-zinc-300" />
                    </div>
                </div>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {metrics.map((m, i) => (
                    <div
                        key={m.label}
                        className="metric-card bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-3xl hover:border-zinc-700 transition-colors group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-2 rounded-xl bg-zinc-800/50", m.color)}>
                                <m.icon className="w-6 h-6" />
                            </div>
                            <div className="text-green-400 text-xs font-semibold px-2 py-1 bg-green-950/30 rounded-full flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3" /> {m.change}
                            </div>
                        </div>
                        <p className="text-zinc-500 text-sm font-medium">{m.label}</p>
                        <h3 className="text-3xl font-bold mt-1 group-hover:text-indigo-400 transition-colors">{m.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="main-card lg:col-span-2 bg-gradient-to-br from-zinc-900/60 to-zinc-900/20 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden relative min-h-[400px]">
                    <div className="absolute top-6 left-6 z-10">
                        <h3 className="text-xl font-semibold">Global Sentiment</h3>
                        <p className="text-zinc-400 text-sm">Real-time aggregate across all platforms</p>
                    </div>
                    <SentimentSphere />
                    <div className="absolute bottom-6 right-6 flex gap-4">
                        <button className="px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-xl">Detailed Insights</button>
                    </div>
                </div>

                <div className="main-card bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-3xl">
                    <h3 className="text-xl font-semibold mb-6">AI Feedback Analysis</h3>
                    <div className="space-y-6">
                        {insights.map((insight, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-zinc-800/20 border border-zinc-800/50 hover:bg-zinc-800/40 transition-all cursor-default">
                                <div className={cn(
                                    "w-1.5 h-auto rounded-full",
                                    insight.severity === 'high' ? 'bg-red-500' :
                                        insight.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                )} />
                                <div>
                                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{insight.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl">
                        <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <TrendingUp className="w-3 h-3" />
                            Growth Hack
                        </h4>
                        <p className="text-white text-sm leading-relaxed">
                            Respond to 3-star reviews within 2 hours to increase brand loyalty by up to 24%.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="main-card bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-3xl">
                    <h3 className="text-xl font-semibold mb-6">Top Performing Platforms</h3>
                    <div className="space-y-4">
                        {platforms.map(p => (
                            <div key={p.name} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-700 rounded-xl flex items-center justify-center font-bold text-xs uppercase">{p.name[0]}</div>
                                    <div>
                                        <h4 className="text-sm font-semibold">{p.name}</h4>
                                        <p className="text-zinc-500 text-xs">{p.reviews.toLocaleString()} reviews</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-indigo-400 font-bold">
                                        <Star className="w-4 h-4 fill-indigo-400" />
                                        {p.score}
                                    </div>
                                    <div className={cn("text-[10px] items-center gap-1 mt-1 justify-end flex",
                                        p.trend === 'up' ? "text-green-400" : p.trend === 'down' ? "text-red-400" : "text-zinc-500"
                                    )}>
                                        {p.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                                        {p.trend === 'up' ? 'Rising' : p.trend === 'down' ? 'Declining' : 'Stable'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="main-card bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 rounded-3xl flex items-center justify-center group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-center relative z-10">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700 group-hover:border-indigo-500 transition-all">
                            <TrendingUp className="w-8 h-8 text-zinc-300 group-hover:text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">View Full Analytics</h3>
                        <p className="text-zinc-500 text-sm max-w-[200px] mx-auto">Access the deep dive explorer for cross-platform trend analysis.</p>
                    </div>
                </div>
            </div>

            <ReviewFeed />
        </div>
    );
}
