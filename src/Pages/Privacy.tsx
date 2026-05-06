import { motion } from 'motion/react';
import PrivacyHero from '../Components/Privacy/PrivacyHero';
import PrivacyPolicyContent from '../Components/Privacy/PrivacyPolicyContent';

export default function Privacy() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-slate-950 min-h-screen pt-20"
        >
            <PrivacyHero />
            <PrivacyPolicyContent />

            {/* Contact Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-indigo-600 rounded-[4rem] p-16 md:p-32 text-center space-y-12 shadow-2xl shadow-indigo-500/20">
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                            Questions about <br />
                            your security?
                        </h2>
                        <p className="text-indigo-100 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                            Our Data Protection Officer is standing by to assist with any inquiries regarding our security protocols.
                        </p>
                        <div>
                            <a
                                href="mailto:privacy@boinet.io"
                                className="inline-flex items-center px-12 py-6 bg-white text-indigo-600 rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95"
                            >
                                Contact Privacy Team
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
