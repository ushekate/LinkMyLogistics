'use client';
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import UserVerificationViewDesktop from "./components/desktopView";
// import UserVerificationViewMobile from "./components/mobileView";



export default function UserVerification() {
    const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('User Verification View Details')
	}, []);

    return(
        <section>
            <UserVerificationViewDesktop />
            {/* {
                useIsMobile()?(
                    <UserVerificationViewMobile />
                ) : (
                    <UserVerificationViewDesktop />
                )
            } */}
        </section>
    )
}