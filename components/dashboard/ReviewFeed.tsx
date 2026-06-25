"use client";

import React from "react";
import { Star, MessageCircle, MoreHorizontal, ThumbsUp, ShieldCheck } from "lucide-react";
import { cn } from "@/components/utils";

const reviews = [
    {
        author: "Sarah J.",
        platform: "Amazon",
        rating: 5,
        text: "Absolutely stunning quality. The attention to detail on the stitching is far beyond what I expected for this price point.",
        date: "2 hours ago",
        sentiment: "positive",
        verified: true,
    },
    {
        author: "Michael Chen",
        platform: "Shopify",
        rating: 2,
        text: "The product itself is great, but the shipping took nearly 3 weeks to arrive in Vancouver. Customer service was slow to respond.",
        date: "5 hours ago",
        sentiment: "negative",
        verified: true,
    },
    {
        author: "Emma Wilson",
        platform: "Google",
        rating: 4,
        text: "Great experience overall. The packaging was eco-friendly which I really appreciate. Will definitely buy again.",
        date: "1 day ago",
        sentiment: "positive",
        verified: false,
    }
];

export default function ReviewFeed() {
    return (
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-3xl mt-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-semibold">Live Review Stream</h3>
                    <p className="text-zinc-500 text-sm">Real-time ingestion from 12 connected platforms</p>
                </div>
                <button className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                </button>
            </div>

            <div className="space-y-4">
                {reviews.map((review, idx) => (
                    <div
                        key={idx}
                        className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-zinc-800/20 border border-transparent hover:border-zinc-700/50 hover:bg-zinc-800/40 transition-all cursor-default"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs">
                                    {review.author[0]}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm">{review.author}</span>
                                        {review.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />}
                                        <span className="text-zinc-600 px-1.5 py-0.5 rounded bg-zinc-900 text-[10px] uppercase font-bold">{review.platform}</span>
                                    </div>
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn("w-3 h-3", i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-700")}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-zinc-300 text-sm leading-relaxed mb-4">{review.text}</p>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5 text-zinc-500 hover:text-indigo-400 transition-colors cursor-pointer">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-xs font-medium">Smart Reply</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-zinc-500 hover:text-green-400 transition-colors cursor-pointer">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-xs font-medium">Flag Insight</span>
                                </div>
                                <span className="text-zinc-600 text-[10px] font-medium ml-auto">{review.date}</span>
                            </div>
                        </div>

                        <div className="md:w-32 flex flex-col justify-center items-center rounded-xl bg-zinc-900/50 p-4 border border-zinc-800/50 group-hover:border-indigo-500/30 transition-colors">
                            <div className={cn(
                                "text-[10px] font-bold uppercase tracking-widest mb-1",
                                review.sentiment === 'positive' ? 'text-green-500' : 'text-red-500'
                            )}>
                                {review.sentiment}
                            </div>
                            <div className="text-xs text-zinc-500 font-medium text-center">AI Confidence</div>
                            <div className="w-full bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full",
                                        review.sentiment === 'positive' ? 'bg-green-500' : 'bg-red-500'
                                    )}
                                    style={{ width: '92%' }}
                                />
                            </div>
                            <div className="mt-1 text-[10px] text-zinc-400 font-bold">92%</div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-4 rounded-2xl border border-dashed border-zinc-700 hover:border-indigo-500 hover:bg-indigo-500/5 text-zinc-500 hover:text-indigo-400 transition-all font-medium text-sm">
                Load 240 more reviews...
            </button>
        </div>
    );
}
