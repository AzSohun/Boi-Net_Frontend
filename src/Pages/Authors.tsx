import { motion } from 'motion/react';
import AuthorsHero from '../Components/Authors/AuthorsHero';
import AuthorCard from '../Components/Authors/AuthorCard';
import AuthorsCTA from '../Components/Authors/AuthorsCTA';


const authors = [
    {
        id: '1',
        name: 'Elena Vance',
        role: 'Speculative Fiction',
        bio: 'Elena explores the intersections of biotechnology and human emotion. Her recent work "Neon Pulse" has redefined cyberpunk for the modern era.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000',
        stats: { books: 12, readers: '450K+', followers: '120K' },
        colors: 'from-blue-600/20 to-indigo-600/20'
    },
    {
        id: '2',
        name: 'Marcus Thorne',
        role: 'Political Thriller',
        bio: 'A former investigative journalist turned novelist, Thorne brings a gritty realism to the high-stakes world of international espionage.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000',
        stats: { books: 8, readers: '890K+', followers: '85K' },
        colors: 'from-slate-600/20 to-slate-900/20'
    },
    {
        id: '3',
        name: 'Sofia Al-Farsi',
        role: 'Historical Depth',
        bio: 'Sofia restores forgotten voices from history, blending rigorous research with beautiful, lyrical prose that spans generations.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000',
        stats: { books: 5, readers: '230K+', followers: '210K' },
        colors: 'from-amber-600/20 to-orange-600/20'
    },
    {
        id: '4',
        name: 'Julian Barnes-Lee',
        role: 'Digital Philosopher',
        bio: 'Julian writes at the edge of human thought, questioning our relationship with artificial intelligence and the digital soul.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1000',
        stats: { books: 15, readers: '1.2M', followers: '340K' },
        colors: 'from-indigo-600/20 to-purple-600/20'
    }
];

export default function Authors() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#FDFCFB] dark:bg-slate-950 py-40 px-6 relative overflow-hidden"
        >
            <div className="absolute top-20 left-0 right-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] flex justify-center whitespace-nowrap overflow-hidden select-none">
                <span className="text-[30vw] font-black uppercase leading-none tracking-tighter italic">Creators</span>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <AuthorsHero />

                <div className="grid lg:grid-cols-2 gap-12">
                    {authors.map((author, i) => (
                        <AuthorCard key={author.id} author={author} index={i} />
                    ))}
                </div>

                <AuthorsCTA />
            </div>
        </motion.div>
    );
}
