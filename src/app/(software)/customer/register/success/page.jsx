import { Check, BadgeHelp, Handshake, Dot, LogIn } from 'lucide-react';

export default function RegistrationSuccess() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-white"
            style={{
                backgroundImage: "url('/sucess.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-white w-full max-w-5xl max-h-5xl flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden">
                {/* Left Side */}
                <div
                    className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 md:p-10"
                    style={{ background: 'linear-gradient(to bottom right, var(--foreground), var(--primary))' }}
                >
                    <div className="bg-white p-8 rounded-full">
                        <Check size={50} className="text-foreground" />
                    </div>
                    <h1 className="text-white text-2xl font-semibold mt-5 text-center">Welcome Aboard!</h1>
                    <p className="text-background mt-6 text-center">
                        Your journey with Green Ocean Logistics begins now
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 sm:p-8 md:p-10">
                    <div className="bg-foreground p-4 rounded-full">
                        <BadgeHelp size={30} className="text-white" />
                    </div>
                    <h1 className="text-foreground mt-2 text-2xl font-semibold text-center">Registration Successful</h1>
                    <hr className="border-foreground w-20 border-t-2 mt-2" />

                    {/* Welcome Card */}
                    <div className="bg-white border border-accent rounded-lg shadow-sm p-6 w-full mt-7">
                        <div className="flex items-start">
                            <Handshake className="text-foreground mr-3 mt-1 w-5 h-5" />
                            <h1 className="text-xl text-foreground font-semibold">Welcome to Green Ocean Logistics</h1>
                        </div>
                        <p className="text-secondary mt-4 pl-8">
                            You have successfully created your account and are now part of our logistics network.
                        </p>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white border border-accent rounded-xl p-7 w-full mt-6">
                        <div className="flex items-center mb-3">
                            <span className="bg-transparent text-foreground mr-3 flex items-center">
                                <Dot className="w-8 h-8" fill="#166534" />
                            </span>
                            <h1 className="text-lg font-semibold text-foreground">Account Status: Active</h1>
                        </div>
                        <p className="text-secondary text-base mb-5">
                            You can now log in and start using the<br />
                            platform to manage your logistics operations, track shipments, and access all our services.
                        </p>
                        <ul className="space-y-3 text-secondary text-base">
                            <li className="flex items-center">
                                <span className="bg-foreground rounded-full p-1 mr-2 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-white" />
                                </span>
                                Access to dashboard and analytics
                            </li>
                            <li className="flex items-center">
                                <span className="bg-foreground rounded-full p-1 mr-2 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-white" />
                                </span>
                                Real-time shipment tracking
                            </li>
                            <li className="flex items-center">
                                <span className="bg-foreground rounded-full p-1 mr-2 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-white" />
                                </span>
                                24/7 customer support access
                            </li>
                        </ul>
                    </div>
                    <button className="bg-foreground text-white flex items-center justify-center gap-2 py-3 w-full rounded-md mt-3 mb-2">
                        <LogIn />
                        Go to Login
                    </button>
                    <p className="text-secondary text-center">
                        Need help? <a className="text-red-700">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}