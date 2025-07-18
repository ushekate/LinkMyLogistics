'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import ViewPricingRequest from "./components/page";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle('Pricing Request')
    }, []);

	return (
		<section className="grid gap-8">
			<ViewPricingRequest />
		</section>
	)
}

