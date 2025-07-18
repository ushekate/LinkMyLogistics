'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import EditTicket from "./components/editTicket";
import { useEffect } from "react";


export default function EditPage() {
    const { setTitle } = useSidebar();

    useEffect(() => {
        setTitle("Edit Ticket")
    })

    return(
        <section>
            <EditTicket />
        </section>
    )
}