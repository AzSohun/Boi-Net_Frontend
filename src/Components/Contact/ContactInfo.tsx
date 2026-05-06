import { Mail, Phone, MapPin, X } from 'lucide-react';

const InstagramIcon = (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const LinkedinIcon = (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@boinet.io', subValue: '24/7 Digital support' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', subValue: 'Mon-Fri, 9am-6pm EST' },
    { icon: MapPin, label: 'HQ', value: 'New York, NY', subValue: 'Hudson Yards District' },
];

const socials = [
    { icon: X, href: '#' },
    { icon: InstagramIcon, href: '#' },
    { icon: LinkedinIcon, href: '#' },
];

export default function ContactInfo() {
    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Node Entry Points</p>
                <div className="grid gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    {contactInfo.map((item, i) => (
                        <div key={i} className="group bg-white dark:bg-slate-950 p-6 flex flex-col gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{item.label}</span>
                                <item.icon className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{item.value}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.subValue}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Network Presence</p>
                <div className="grid grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    {socials.map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            className="bg-white dark:bg-slate-950 p-5 flex flex-col items-center gap-3 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group"
                        >
                            <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Connect</span>
                        </a>
                    ))}
                </div>
            </div>

            <div className="p-8 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl overflow-hidden relative group border border-slate-800 dark:border-slate-200">
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h5 className="text-xs font-black uppercase tracking-[0.2em]">Open Positions</h5>
                    </div>
                    <p className="text-slate-400 dark:text-slate-600 font-medium leading-relaxed text-sm">
                        We are looking for architects of the new digital age. Step into our world and help us build the future.
                    </p>
                    <button className="w-full h-12 bg-white dark:bg-slate-950 text-slate-950 dark:text-white rounded-lg font-black uppercase text-[10px] tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-3">
                        Career Portal
                        <div className="w-6 h-px bg-current opacity-30" />
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
}
