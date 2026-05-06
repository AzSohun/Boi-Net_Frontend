import { Database, Eye, Share2, Shield, Fingerprint, RefreshCcw } from 'lucide-react';
import PrivacySection from './PrivacySection';

export default function PrivacyPolicyContent() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto space-y-12">
                <PrivacySection
                    index={0}
                    icon={Database}
                    title="Information We Collect"
                >
                    <p>
                        We collect the minimum amount of data required to provide a seamless reading experience. This includes:
                    </p>
                    <ul>
                        <li><strong>Account Access:</strong> Your authentication details provided via Google Login.</li>
                        <li><strong>Library Data:</strong> Your saved books, favorites, and reading progress.</li>
                        <li><strong>Technical Logs:</strong> Anonymous telemetry to help us debug and optimize performance.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection
                    index={1}
                    icon={Eye}
                    title="Digital Transparency"
                >
                    <p>
                        We believe in complete visibility. You have the right to know exactly how your data is used. We do not use intrusive tracking or build hidden psychological profiles based on your literary preferences.
                    </p>
                    <p>
                        Your reading habits stay in your library. We do not monetize your "intellectual footprint."
                    </p>
                </PrivacySection>

                <PrivacySection
                    index={2}
                    icon={Share2}
                    title="Third-Party Disclosure"
                >
                    <p>
                        BoiNet does not sell, trade, or otherwise transfer your data to outside parties. This excludes trusted third parties who assist us in operating our application, such as:
                    </p>
                    <ul>
                        <li><strong>Cloud Infrastructure:</strong> Secure hosting and database management.</li>
                        <li><strong>Authentication:</strong> Google Cloud Platform for secure identity verification.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection
                    index={3}
                    icon={Shield}
                    title="Encryption Protocols"
                >
                    <p>
                        Every byte of data transmitted between your device and our servers is protected by industry-standard TLS 1.3 encryption.
                    </p>
                    <p>
                        Our databases use AES-256 encryption at rest, ensuring that even in the unlikely event of physical hardware compromise, your data remains an unreadable cipher.
                    </p>
                </PrivacySection>

                <PrivacySection
                    index={4}
                    icon={Fingerprint}
                    title="Your Rights & Ownership"
                >
                    <p>
                        You own your data. At any time, you can:
                    </p>
                    <ul>
                        <li>Export your entire library history in a machine-readable JSON format.</li>
                        <li>Request permanent deletion of your account and all associated data records.</li>
                        <li>Opt-out of any non-critical functional telemetry.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection
                    index={5}
                    icon={RefreshCcw}
                    title="Updates to this Policy"
                >
                    <p>
                        As technology evolves, so will our privacy measures. We will notify you of any material changes to this policy via the application's interface.
                    </p>
                    <p className="italic text-sm">
                        Last structural audit: May 2024
                    </p>
                </PrivacySection>
            </div>
        </section>
    );
}
