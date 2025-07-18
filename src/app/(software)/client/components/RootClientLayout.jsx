'use client'

import { SidebarProvider } from "@/contexts/SidebarProvider"
import Sidebar from "@/components/ui/Sidebar"

export default function RootClientLayout({ children }) {
	return (
		<SidebarProvider>
			<Sidebar access="Client">
				{children}
			</Sidebar>
		</SidebarProvider>
	)
}

