'use client'
import { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarProvider";
import Profile from "./components/Profile";
import RequiredDocuments from "./components/RequiredDocuments";
import Password from "./components/Password";
import Documents from "./components/Documents";

export default function ProfilePage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Profile Setting')
	}, []);

	return (
		<section className="grid gap-6">
			<RequiredDocuments />
			<Profile />
			<Password />
			<Documents />
		</section>
	)
}

