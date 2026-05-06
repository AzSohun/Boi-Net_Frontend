import { BookOpen } from 'lucide-react';
import AboutSectionHeader from './AboutSectionHeader';

export default function AboutPhilosophy() {
    return (
        <section className="py-32 px-6 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                <div className="relative group">
                    <div className="aspect-4/5 rounded-[4rem] overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200"
                            alt="Library workspace"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <div className="absolute -bottom-10 -right-10 bg-indigo-600 p-12 rounded-[3rem] text-white hidden md:block shadow-2xl">
                        <BookOpen className="w-12 h-12 mb-4" />
                        <p className="text-4xl font-black tracking-tighter italic font-serif">Est. 2024</p>
                    </div>
                </div>

                <div className="space-y-12">
                    <AboutSectionHeader
                        badge="Our Philosophy"
                        title="Modernizing the classic library experience."
                        subtitle="We believe that in an age of digital noise, the ability to focus on deep, meaningful content is a superpower. BoiNet provides the tools and the environment to reclaim that focus."
                    />
                    <div className="grid sm:grid-cols-2 gap-8 pt-6">
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <div className="text-4xl font-black text-indigo-600 mb-2">12M+</div>
                            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Books Curated</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <div className="text-4xl font-black text-indigo-600 mb-2">142</div>
                            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Countries Reached</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
