'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import PricingPage from "./components/pricingPage";
import { useEffect } from "react";


export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle('View Pricing Request')
    }, []);

	return (
        <section className="grid gap-8">
            <PricingPage />
        </section>
)}

