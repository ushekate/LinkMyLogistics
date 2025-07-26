'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MailCheck, RotateCw } from 'lucide-react';
import pbclient from '@/lib/db';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

export default function EmailVerificationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const REGEXP_ONLY_DIGITS_AND_CHARS = /^[a-zA-Z0-9]+$/;

    useEffect(() => {
        if (email) sendOtp();
    }, [email]);

    const sendOtp = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setMessage("OTP sent successfully.");
            } else {
                setMessage("Failed to send OTP.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Error sending OTP.");
        }
        setLoading(false);
    };

    const verifyOtp = async () => {
        try {
            const result = await pbclient.collection('email_otps').getFirstListItem(
                `email="${email}" && code="${otp}" && expires_at > "${new Date().toISOString()}"`
            );

            if (result) {
                await pbclient.collection('email_otps').delete(result.id);
                router.push('/register/documents');
            } else {
                setMessage("Invalid or expired OTP.");
            }
        } catch (err) {
            setMessage("Verification failed.");
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-background">
            {/* Left Visual Section */}
            <div className="flex flex-1 min-h-screen items-center justify-center text-white px-6 py-10 lg:w-1/2 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:h-full"
                style={{ background: 'linear-gradient(to bottom right, var(--foreground), var(--primary))' }}
            >
                <div className="flex flex-col items-center justify-center">
                    <img src="/register/emailVerify.png" className="h-48 w-48 sm:h-60 sm:w-60 rounded-2xl shadow-black shadow-lg mb-8 object-contain" />
                    <h1 className="text-2xl font-bold text-center">Secure Email Verification</h1>
                    <p className="text-background mt-5 px-2 sm:px-10 text-center">
                        We've sent a verification code to your email address to ensure your account security.
                    </p>
                </div>
            </div>

            {/* Right Verification Section */}
            <div className="flex items-center justify-center py-20 lg:ml-[50vw]">
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-8 max-w-md w-full flex flex-col items-center justify-center">
                    <div className="bg-light-primary w-10 h-10 flex items-center justify-center rounded-full">
                        <MailCheck className="text-white" />
                    </div>
                    <h1 className="mt-2 text-2xl font-semibold text-black text-center">Verify Your Email</h1>
                    <p className="mt-2 text-secondary text-center">A verification code has been sent to your email:</p>
                    <p className="text-foreground break-all text-center">{email}</p>
                    <p className="text-secondary mt-5 text-center">Enter Verification Code :</p>

                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={setOtp}>
                        <InputOTPGroup className="flex gap-x-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className="mt-3 w-9 h-9 rounded-lg border border-secondary/50 bg-white text-center text-lg text-secondary ring-1 ring-secondary/50 focus:ring-2 focus:ring-[#16A34A]"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-10 w-full gap-4">
                        <button onClick={sendOtp} className="flex items-center text-sm text-foreground font-semibold">
                            <RotateCw size={13} className="mr-1" />
                            {loading ? "Sending..." : "Refresh Code"}
                        </button>
                        <button
                            className="bg-foreground text-white px-6 py-2 rounded-md"
                            onClick={verifyOtp}
                        >
                            Verify
                        </button>
                    </div>
                    <p className="text-secondary text-sm mt-4 text-center">Code expires in 05:00</p>

                    {message && (
                        <p className="text-sm mt-2 text-center text-red-500">{message}</p>
                    )}

                    <div className="bg-accent mt-10 text-center p-3 rounded-md w-full">
                        <p className="text-secondary">Didn't receive the code? Check your spam folder or try again.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
