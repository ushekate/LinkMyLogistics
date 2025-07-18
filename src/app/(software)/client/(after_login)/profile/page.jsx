'use client';
import { useIsMobile } from "@/hooks/use-mobile";
import MobileRequestList from "./components/MobileTable";
import RequestList from "./components/Table";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";



export default function ProfilePage() {
    const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Client Profile')
	}, []);

    return(
        <section>
            {
                useIsMobile()?(
                    <MobileRequestList />
                ) : (
                    <RequestList />
                )
            }
        </section>
    )
}