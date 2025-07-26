'use client';
import { useState } from 'react';
import pbclient from '@/lib/db';
import {
    ShieldHalf, Check, IdCard, ReceiptText, Hotel, Paperclip, ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DocumentsPage() {
    const [files, setFiles] = useState({
        id_proof: null,
        gst_cer: null,
        comp_reg: null,
        add_doc: []
    });
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleFileChange = (e, field, multiple = false) => {
        const file = multiple ? Array.from(e.target.files) : e.target.files[0];
        setFiles(prev => ({
            ...prev,
            [field]: file
        }));
    };

    const handleUpload = async () => {
        setLoading(true);

        // 1. Validate
        if (!files.id_proof || !files.gst_cer || !files.comp_reg) {
            alert('Please upload all required documents');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('id_proof', files.id_proof);
            formData.append('gst_cer', files.gst_cer);
            formData.append('comp_reg', files.comp_reg);

            if (files.add_doc.length > 0) {
                for (let file of files.add_doc) {
                    formData.append('add_doc', file);
                }
            }

            // Optional: replace with actual user id from auth store
            const userId = pbclient.authStore.model?.id || 'your-user-id';
            formData.append('user', userId);

            const record = pbclient.collection('kyc_documents').create(formData);
            alert('Documents uploaded successfully!');
            console.log(record);
            router.push('/customer/register/emailVerify');
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        {
            key: 'id_proof',
            icon: { icon: IdCard, bg: "#DBEAFE", color: "#2563EB" },
            title: "Identity Proof",
            desc: "Aadhaar Card, PAN Card, or Business Registration Certificate",
            type: "PDF, JPG, PNG (Max 10MB)",
            multiple: false
        },
        {
            key: 'gst_cer',
            icon: { icon: ReceiptText, bg: "#DCFCE7", color: "#16A34A" },
            title: "GST Certificate",
            desc: "Valid GST registration certificate",
            type: "PDF, JPG, PNG (Max 10MB)",
            multiple: false
        },
        {
            key: 'comp_reg',
            icon: { icon: Hotel, bg: "#F3E8FF", color: "#9333EA" },
            title: "Company Registration",
            desc: "Certificate of Incorporation or Partnership Deed",
            type: "PDF, JPG, PNG (Max 10MB)",
            multiple: false
        },
        {
            key: 'add_doc',
            icon: { icon: Paperclip, bg: "#FFEDD5", color: "#EA580C" },
            title: "Additional Documents",
            desc: "Bank statements, utility bills, or other supporting documents",
            type: "Multiple files allowed",
            multiple: true
        }
    ];

    const features = [
        { icon: <Check size={14} className="text-white" />, title: "256-bit SSL encryption" },
        { icon: <Check size={14} className="text-white" />, title: "GDPR compliant storage" },
        { icon: <Check size={14} className="text-white" />, title: "Instant verification" }
    ];

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
            {/* Left Panel */}
            <div
                className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-20 py-10 text-white flex flex-col justify-center"
                style={{
                    background: 'linear-gradient(to bottom right, var(--foreground), var(--primary))',
                    minHeight: '100vh',
                }}
            >
                <div className="flex flex-col items-center justify-center h-full text-center space-y-5 lg:items-start lg:text-left lg:space-y-0">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 lg:mb-4">
                        <ShieldHalf size={22} className="text-white" />
                    </div>
                    <h1 className="text-[22px] sm:text-[25px] font-semibold mb-2">Secure Document Upload</h1>
                    <p className="text-[16px] sm:text-[18px] mt-2 mb-4">
                        Upload your KYC documents securely. All files are encrypted and stored safely to ensure your privacy and compliance.
                    </p>
                    <div className="space-y-4 mt-4 relative w-full flex flex-col items-center lg:items-start">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center justify-center lg:justify-start">
                                <div className="w-6 h-6 bg-light-primary rounded-full flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <span className="ml-3 text-md">{feature.title}</span>
                            </div>
                        ))}
                        {/* <img
                            src="/securitylogo.png"
                            alt="security"
                            className="absolute bottom-5 left-0 w-36 opacity-10 hidden sm:block"
                        /> */}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex flex-col flex-1 p-4 sm:p-8 md:p-10">
                <h1 className="text-[20px] sm:text-[24px] md:text-[25px] font-semibold text-black">
                    Upload KYC Documents
                </h1>
                <p className="text-[#4B5563] mb-5 text-sm sm:text-base">
                    Please upload the required documents to complete your verification
                </p>

                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="border border-dotted border-[#737475] rounded-xl p-4 flex flex-col gap-2 mb-5"
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className="h-10 w-10 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: card.icon.bg }}
                            >
                                <card.icon.icon size={23} style={{ color: card.icon.color }} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-md font-semibold text-black">{card.title}</h3>
                                <p className="text-sm text-gray-600">{card.desc}</p>
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm rounded-md cursor-pointer w-fit">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Choose File
                                    <input
                                        type="file"
                                        hidden
                                        multiple={card.multiple}
                                        onChange={(e) => handleFileChange(e, card.key, card.multiple)}
                                    />
                                </label>
                                <p className="text-xs text-gray-500 mt-1 sm:mt-0">{card.type}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <hr className="border-t border-gray-200 mb-4" />
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <button
                        className="bg-gradient-to-r from-foreground to-light-primary text-white text-sm px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-1 w-full sm:w-auto"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Continue'}{' '}
                        <span className="text-lg">
                            <ArrowRight size={18} className="font-bold text-3xl mt-1" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

