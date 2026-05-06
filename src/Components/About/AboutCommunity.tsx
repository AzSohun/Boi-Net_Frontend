import { Users } from 'lucide-react';

export default function AboutCommunity() {
    const teamPhotos = [
        "photo-1507003211169-0a1dd7228f2d",
        "photo-1494790108377-be9c29b29330",
        "photo-1500648767791-00dcc994a43e",
        "photo-1534528741775-53994a69daeb"
    ];

    return (
        <section className="py-32 px-6 bg-slate-900 dark:bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Users className="absolute -top-32 -right-32 w-150 h-150 text-indigo-500" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-12">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                        By Readers, <br />
                        <span className="text-indigo-400 italic font-serif">For Readers.</span>
                    </h2>
                    <p className="text-2xl text-slate-400 max-w-xl font-medium leading-normal tracking-tight">
                        We are a collective of researchers, engineers, and designers who believe that reading is the ultimate form of self-expansion.
                    </p>
                    <div className="flex gap-6">
                        <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-400 hover:text-white transition-all active:scale-95">
                            Join our Team
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {teamPhotos.map((id, i) => (
                        <div key={id} className={`aspect-square rounded-[3rem] overflow-hidden bg-slate-800 ${i % 2 === 1 ? 'translate-y-12' : ''}`}>
                            <img
                                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=600`}
                                alt="Team member"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
