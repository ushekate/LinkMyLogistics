'use client';

import { Button, ButtonCard } from "@/components/ui/Button";
import { CompanyName } from "@/constants/CompanyName";
import { servicesList } from "@/constants/services";
import { ArrowUpRight, LogInIcon, LogOutIcon, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MobileHeaderLayout({ currentService, setCurrentService }) {
	const [isLogin, setIsLogin] = useState(false); 
	const [displayLogin, setDisplayLogin] = useState(false);
	const router = useRouter();

	return (
		<header className="flex flex-col gap-8 w-full py-4">
			{/* Top Section */}
			<div className="flex items-center justify-center w-full">
				<div className="flex justify-between items-center px-3 gap-3 w-full">
					{/* Logo and Company Name */}
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
							<Image
								src="/logo.png"
								width={200}
								height={200}
								alt="Company Logo"
								className="object-contain"
							/>
						</div>
						<h1 className="font-bold text-lg">{CompanyName}</h1>
					</div>

					{/* Auth Buttons */}
					<div className="flex items-center gap-4">
						{isLogin ? (
							<>
								<Button
									title="Dashboard"
									icon={<ArrowUpRight size={18} />}
									iconPosition="right"
									variant="outline"
									className="rounded-md text-sm"
									onClick={() => router.push("/customer/dashboard")}
								/>
								<Button
									title="Logout"
									icon={<LogOutIcon size={18} />}
									iconPosition="right"
									variant="ghost"
									className="rounded-md text-sm"
									onClick={() => {
										setIsLogin(false); 
									}}
								/>
							</>
						) : (
							<Button
								title="Login"
								icon={<LogInIcon size={18} />}
								iconPosition="right"
								variant="default"
								className="rounded-md text-sm"
								onClick={() => setDisplayLogin(true)}
							/>
						)}
					</div>
				</div>
			</div>

			{/* Services List Section */}
			<div className="grid grid-cols-3 p-4 gap-2 rounded-xl">
				{servicesList.map((service) => (
					<ButtonCard
						key={service.id}
						title={service.label}
						icon={<service.icon className="h-9 w-9" />}
						iconPosition="top"
						className={`max-w-xl bg-[var(--accent)] text-[var(--primary)] p-6 rounded-xl shadow-lg font-normal
							${currentService === service.id
								? "border-[var(--primary)] border-2 font-extrabold"
								: "shadow-[var(--accent)]"
							}`}
						variant="none"
						onClick={() => setCurrentService(service.id)}
					/>
				))}
			</div>

			{/* Optional Login Popup */}
			{displayLogin && <LoginPopUp onClose={() => setDisplayLogin(false)} />}
		</header>
	);
}



