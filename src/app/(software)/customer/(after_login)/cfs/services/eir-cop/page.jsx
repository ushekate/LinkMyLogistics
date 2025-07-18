'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "./components/Table";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTable from "./components/MobileTable";

export default function EIRRequestPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('EIR / COP');
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

