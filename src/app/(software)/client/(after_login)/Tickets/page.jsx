'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import TicketPage from "./supportTicket/components/Table";

export default function Page() {
    const { setTitle } = useSidebar();

    useEffect(() => {
        setTitle("Support Ticket");
    })

    return(
        <section>
            <div><TicketPage /></div>
        </section>
    )
}