'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Table from "./components/Table";
import MobileTable from "./components/MobileTable";

export default function JobOrderUpdatePage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Job Order Update')
	}, []);

	return (
		<section className="grid gap-8">
			{
				useIsMobile() ? (
					<MobileTable />
				) : (
					<Table />
				)
			}
		</section>
	)
}
