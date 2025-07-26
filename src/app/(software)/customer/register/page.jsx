'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import pbclient from '@/lib/db';
import {
    Package,
    UserRound,
    Phone,
    Mail,
    Lock,
    Truck,
    ShieldHalf,
    ChartSpline
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export default function RegistrationLoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });

    const handleRegister = async () => {
        if (!form.terms) {
            alert('Please agree to the terms and privacy policy.');
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            await pbclient.collection('admin').create({
                email: form.email,
                password: form.password,
                passwordConfirm: form.confirmPassword,
                name: form.name,
                phone: form.phone,
            });

            alert('Account created successfully!');
            router.push('/customer/register/emailVerify');
            // router.push(`/verify?email=${encodeURIComponent(form.email)}`);

        } catch (err) {
            console.error(err);
            alert(err?.message || 'Registration failed.');
        }
    };

    return (
        <div className="w-full min-h-screen flex bg-background">
            {/* Left Panel */}
            <div className="bg-foreground w-1/2 flex flex-col items-center justify-center px-10">
                <img
                    src="/register/LoginImage.png"
                    className="h-70 w-70 rounded-2xl shadow-black shadow-lg mb-8"
                />
                <h1 className="text-white font-bold text-3xl mb-4 text-center">
                    Welcome to Logistics
                </h1>
                <p className="text-white text-center text-lg mb-8 max-w-md">
                    Streamline your logistics operations with our comprehensive
                    management platform. Join thousands of businesses optimizing their
                    supply chain.
                </p>
                <div className="flex items-center justify-center gap-8 mt-4">
                    <div className="flex flex-row items-center">
                        <Truck className="text-white h-7 w-7 mr-1" />
                        <span className="text-white text-sm">Fast Delivery</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <ShieldHalf className="text-white h-7 w-7 mr-1" />
                        <span className="text-white text-sm">Secure</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <ChartSpline className="text-white h-7 w-7 mr-1" />
                        <span className="text-white text-sm">Analytics</span>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex flex-col w-1/2 min-h-screen items-center justify-center bg-background px-8">
                <div className="flex flex-col items-center w-full max-w-md">
                    <div className="flex items-center mb-6">
                        <Package className="text-white bg-foreground p-2 h-10 w-10 rounded-lg mr-3" />
                        <span className="text-2xl font-extrabold text-[#1A2E22]">
                            Logistics
                        </span>
                    </div>
                    <h1 className="font-extrabold text-2xl sm:text-3xl text-center mb-2 text-var(--background-2)">
                        Create Your Account
                    </h1>
                    <p className="text-gray-600 text-center mb-6">
                        Join our logistics platform and start optimizing your operations
                    </p>

                    {/* Full Name */}
                    <div className="w-full mb-3">
                        <label className="flex items-center text-gray-500 text-sm font-medium mb-1">
                            <UserRound size={16} className="mr-2" /> Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            placeholder="Enter your full name"
                            className="border border-gray-300 w-full h-12 rounded-md px-3 bg-white focus:outline-none focus:ring-2 focus:ring-foreground"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="w-full mb-3">
                        <label className="flex items-center text-gray-500 text-sm font-medium mb-1">
                            <Phone size={16} className="mr-2" /> Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            placeholder="Enter your phone number"
                            className="border border-gray-300 w-full h-12 rounded-md px-3 bg-white focus:outline-none focus:ring-2 focus:ring-foreground"
                        />
                    </div>

                    {/* Email */}
                    <div className="w-full mb-3">
                        <label className="flex items-center text-gray-500 text-sm font-medium mb-1">
                            <Mail size={16} className="mr-2" /> Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            placeholder="Enter your email address"
                            className="border border-gray-300 w-full h-12 rounded-md px-3 bg-white focus:outline-none focus:ring-2 focus:ring-foreground"
                        />
                    </div>

                    {/* Password */}
                    <div className="w-full mb-1">
                        <label className="flex items-center text-gray-500 text-sm font-medium mb-1">
                            <Lock size={16} className="mr-2" /> Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            placeholder="Create a strong password"
                            className="border border-gray-300 w-full h-12 rounded-md px-3 bg-white focus:outline-none focus:ring-2 focus:ring-foreground"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="w-full mb-3">
                        <label
                            htmlFor="confirmPassword"
                            className="flex items-center text-secondary text-sm font-medium mb-1"
                        >
                            <Lock size={16} className="mr-2" /> Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={(e) =>
                                setForm({ ...form, confirmPassword: e.target.value })
                            }
                            placeholder="Confirm your password"
                            className="border border-gray-300 w-full h-12 rounded-md px-3 bg-white focus:outline-none focus:ring-2 focus:ring-foreground"
                        />
                    </div>

                    <p className="text-xs text-gray-500 mb-3">
                        Must be at least 8 characters with uppercase, lowercase, and
                        numbers
                    </p>

                    {/* Terms */}
                    <label className="flex items-center space-x-2 mb-4 w-full">
                        <input
                            type="checkbox"
                            checked={form.terms}
                            onChange={(e) =>
                                setForm({ ...form, terms: e.target.checked })
                            }
                            className="h-5 w-5 border-gray-400 rounded"
                        />
                        <span className="text-sm text-gray-700">
                            I agree to the
                            <a className="text-blue-600 ml-1 hover:underline cursor-pointer">
                                Terms of Service
                            </a>
                            and
                            <a className="text-blue-600 ml-1 hover:underline cursor-pointer">
                                Privacy Policy
                            </a>
                        </span>
                    </label>

                    {/* Submit */}
                    <button
                        onClick={handleRegister}
                        className="bg-foreground text-white w-full h-12 rounded-md font-semibold text-lg mt-2 hover:bg-primary transition flex items-center justify-center gap-2"
                    >
                        Next <span className="ml-2">&#8594;</span>
                    </button>

                    {/* Sign In */}
                    <p className="mt-6 text-center text-secondary text-sm">
                        Already have an account?
                        <a
                            href="#"
                            className="text-primary ml-1 font-medium hover:underline"
                        >
                            Sign In
                        </a>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center w-full my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-400 text-sm">
                            Or continue with
                        </span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Google Button */}
                    <button className="border border-gray-300 h-12 w-full rounded-md flex items-center justify-center gap-3 bg-white hover:bg-gray-50 transition">
                        <FcGoogle size={22} className="text-gray-500" />
                        <span className="text-base font-medium text-gray-700">Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
