import { Mail, Phone, MapPin, X, Instagram, Linkedin } from 'lucide-react';

const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@boinet.io', subValue: '24/7 Digital support' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', subValue: 'Mon-Fri, 9am-6pm EST' },
    { icon: MapPin, label: 'HQ', value: 'New York, NY', subValue: 'Hudson Yards District' },
];

const socials = [
    { icon: X, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
];

export default function ContactInfo() {
    return (
        <div className="space-y-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-12">
                {contactInfo.map((item, i) => (
                    <div key={i} className="group flex items-start gap-8 p-6 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-500 border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm shrink-0">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">{item.label}</p>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{item.value}</h4>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">{item.subValue}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Digital Footprint</p>
                <div className="flex gap-4">
                    {socials.map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            className="w-14 h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-90"
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>

            <div className="p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative group">
                <div className="relative z-10 space-y-6">
                    <h5 className="text-2xl font-black italic font-serif">Curious?</h5>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        We're always looking for new perspectives. Check out our career portal if you want to join the collective.
                    </p>
                    <button className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-white transition-colors flex items-center gap-2">
                        View Openings
                        <div className="w-6 h-px bg-indigo-400 group-hover:w-10 transition-all" />
                    </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/20 blur-2xl rounded-full" />
            </div>
        </div>
    );
}
