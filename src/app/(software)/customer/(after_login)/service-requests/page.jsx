'use client'
import { useEffect, useState } from "react";
import { useSidebar } from "@/contexts/SidebarProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import DesktopCFS from "./components/DesktopCFS";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileCFS from "./components/MobileCFS";

export default function RequestServicesPage() {
	const { setTitle } = useSidebar();

	useEffect(() => {
		setTitle('Request List')
	}, []);

	return (
		<section>
			<div className="w-full md:px-6 py-2">
				<Tabs defaultValue="cfs" className="w-full">
					<TabsList className="grid w-full grid-cols-2 bg-[var(--accent)] shadow-md shadow-foreground/40">
						<TabsTrigger value="cfs" className={'w-full'}>CFS</TabsTrigger>
						<TabsTrigger value="soon" className={'w-full'}>Coming Soon</TabsTrigger>
					</TabsList>
					<TabsContent value="cfs" className="md:p-4 w-full h-screen">
						{
							useIsMobile() ? (
								<MobileCFS />
							) : (
								<DesktopCFS />
							)
						}
					</TabsContent>
					<TabsContent value="soon" className="p-4 bg-[var(--accent)] shadow-md shadow-foreground/40 border rounded-lg mt-4">
						<h3 className="font-medium text-lg mb-2">Coming Soon</h3>
						<p>New Services are to be added.</p>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	)
}

