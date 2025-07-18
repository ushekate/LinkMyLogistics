'use client'

import { SidebarProvider } from "@/contexts/SidebarProvider"
import Sidebar from "@/components/ui/Sidebar"

export default function RootCustomerLayout({ children }) {
	return (
		<SidebarProvider>
			<Sidebar>
				{children}
			</Sidebar>
		</SidebarProvider>
	)
}

