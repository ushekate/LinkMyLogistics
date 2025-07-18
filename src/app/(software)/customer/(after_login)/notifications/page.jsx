'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
// import NotificationPage from "./components/notificationPage";
import NotificationsPage from "./components/page";

export default function page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle('Notifications & Updates');
    }, []);

    return (
        <section>
            <NotificationsPage />
        </section>
    );
}