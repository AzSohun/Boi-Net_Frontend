import React from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface PrivacySectionProps {
    icon: LucideIcon;
    title: string;
    children: React.ReactNode;
    index: number;
}

export default function PrivacySection({ icon: Icon, title, children, index }: PrivacySectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative p-12 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-50 dark:border-slate-800 hover:border-indigo-500/50 transition-all duration-500"
        >
            <div className="flex flex-col md:flex-row gap-12">
                <div className="shrink-0">
                    <div className="w-20 h-20 rounded-4xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                        <Icon className="w-8 h-8" />
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {title}
                    </h3>
                    <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-500 dark:prose-p:text-slate-400 prose-strong:text-slate-900 dark:prose-strong:text-white prose-ul:list-none prose-ul:pl-0 prose-li:relative prose-li:pl-8 prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-3 prose-li:before:w-2 prose-li:before:h-2 prose-li:before:bg-indigo-600 prose-li:before:rounded-full">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
