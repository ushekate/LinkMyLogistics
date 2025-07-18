'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "./components/Table";
import MobileTable from "./components/MobileTable";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TaxInvoicesPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Tax Invoices')
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
