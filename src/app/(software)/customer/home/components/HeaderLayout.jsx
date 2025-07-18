'use client';

import { useEffect, useState } from "react";
import {
	LogInIcon,
	ArrowUpRight,
	Users,
	CircleUserRound,
	UserRoundPlus,
	Earth,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { servicesList } from "@/constants/services";
import { useRouter } from "next/navigation";

export default function HeaderLayout({ currentService, setCurrentService }) {
	const [displayAfterHeader, setDisplayAfterHeader] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [displayLogin, setDisplayLogin] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			setDisplayAfterHeader(window.scrollY > 150);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header>
			{/* Top Static Header */}
			<div className={`bg-[var(--background)] border-b pb-10 border-[var(--foreground)]/60 transition-opacity duration-500 ${displayAfterHeader ? "opacity-0" : "opacity-100"}`}>
				<div className="flex flex-col w-full p-4">
					<div className="flex items-center justify-between w-full">
						{/* Logo */}
						<div className="flex items-center gap-2">
							<div className="w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden bg-muted">
								<Earth size={25} title="Logo" />
							</div>
							<h1 className="font-bold text-lg">Link MyLogistics</h1>
						</div>

						{/* Auth Buttons */}
						<div className="flex items-center gap-3">
							<Button
								iconPosition="right"
								variant="outline"
								onClick={() => {
									if (isLogin) {
										router.push("/customer/dashboard");
									} else {
										setDisplayLogin(true);
									}
								}}
								className="rounded-md"
							>
								<ArrowUpRight />
								Dashboard
							</Button>
							<Button
								iconPosition="right"
								className="rounded-md text-white"
								onClick={() => router.push("/login")}
							>
								<CircleUserRound size={20} />
								Login
							</Button>
							<Button
								iconPosition="right"
								className="rounded-md text-white"
								onClick={() => router.push("/signup")}
							>
								<UserRoundPlus />
								Sign Up
							</Button>
						</div>
					</div>
				</div>

				{/* Services Menu */}
				{/* <hr className="border-t-2 border-[var(--foreground)]" /> */}

				<div className="bg-[var(--accent)] mt-4 py-4 px-6 rounded-2xl mx-auto max-w-xl flex justify-between items-center shadow-md border border-gray-300">
					{servicesList.map((item) => (
						<button
							key={item.id}
							onClick={() => setCurrentService(item.id)}
							className={`flex flex-col items-center justify-center px-4 py-2 text-[var(--primary)] transition-all duration-200 ${currentService === item.id
									? "font-bold underline underline-offset-4"
									: "font-medium text-muted-foreground"
								}`}
						>
							<item.icon className="h-6 w-6 mb-1" />
							<span className="text-sm">{item.label}</span>
						</button>
					))}
				</div>


			</div>

			{/* Fixed Header when Scrolled */}
			<div className={`fixed top-0 left-0 right-0 z-50 bg-[var(--accent)] shadow-lg py-2 px-4 sm:px-6 transition-transform duration-300 min-h-20 flex items-center ${displayAfterHeader ? "translate-y-0" : "-translate-y-full"}`}>
				<div className="w-full flex justify-between items-center">
					{/* Logo */}
					<div className="flex items-center gap-3 mr-4">
						<div className="w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden bg-muted">
							<Earth size={25} title="Logo" />
						</div>
						<span className="font-bold text-sm">Link MyLogistics</span>
					</div>

					{/* Services */}
					<div className="flex flex-wrap gap-2 md:gap-3">
						{servicesList.map((item) => (
							<Button
								key={item.id}
								iconPosition="top"
								className="text-[12px]"
								variant={currentService === item.id ? "link" : "none"}
								onClick={() => setCurrentService(item.id)}
							>
								<item.icon className="h-6 w-6" />
								{item.label}
							</Button>
						))}
					</div>

					{/* Right Auth Actions */}
					{isLogin ? (
						<div className="flex items-center ml-4">
							<div className="h-9 w-9 rounded-full bg-[var(--primary)] flex items-center justify-center">
								<Users className="h-5 w-5 text-[var(--background)]" />
							</div>
						</div>
					) : (
						<Button iconPosition="right" className="rounded-md">
							<LogInIcon />
							Login
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}


