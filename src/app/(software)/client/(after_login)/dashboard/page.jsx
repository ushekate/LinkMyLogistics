
'use client'
import { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarProvider";
import Stats from "./components/Stats";
import { orders } from "@/constants/orders";
import Button from "@/components/ui/Button";
import { FileText, Menu, Package, Plus, Truck } from "lucide-react";
import { DataTable } from "@/components/ui/Table";
import { dashboardCols } from "./components/columns";
import Notifications from "./components/Notifications";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTable from "./components/MobileTable";

export default function CustomerDashboardPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Dashboard')
	}, []);

	return (
		<section className="grid gap-8">
			<Stats orders={orders} />
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  w-full gap-6">
				<button
					icon={<Plus className="text-[var(--background)] cursor-pointer" />}
					title={'Create Job Order'}
					className="rounded-md md:w-full w-[300px]"
				/>
				<button
					icon={<Menu className="text-[var(--background)] cursor-pointer" />}
					title={'View All Requests'}
					className="rounded-md md:w-full w-[300px]"
				/>
				<button
					icon={<Package className="text-[var(--background)] cursor-pointer" />}
					title={'Orders Page'}
					className="rounded-md md:w-full w-[300px]"
				/>
			</div>

			<div className="p-6 rounded-xl shadow-2xl bg-[var(--accent)]">
				<h1 className="text-xl font-semibold">Recent Orders</h1>
				{
					useIsMobile() ? (
						<MobileTable />
					) : (
						<DataTable data={orders.slice(0, 5)} columns={dashboardCols} displayButtons={false} displayFilters={false} />
					)
				}
			</div>
		</section>
	)
}

