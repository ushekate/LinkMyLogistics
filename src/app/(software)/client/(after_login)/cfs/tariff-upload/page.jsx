'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTable from "./components/MobileTable";

export default function TariffUpload() {
	const { setTitle } = useSidebar();

	useEffect(() => {
		setTitle('Tariff Upload')
	}, []);

	return (
		<section className="grid gap-8">
			<Form />
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

