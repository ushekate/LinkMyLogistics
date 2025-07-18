'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect, useState } from "react";
import { requestsList } from "@/constants/requests";
import { Select, SelectItem } from "@/components/ui/Select";
import { cfsServices } from "@/constants/services";
import { CircleX, Clock, Verified } from "lucide-react";
import { DataTable } from "@/components/ui/Table";
import { RequestColumns } from "./components/columns";

export default function RequestsPage() {
	const { setTitle } = useSidebar();
	const [requests, setRequests] = useState(requestsList);
	const [Stats, setStats] = useState({
		pending: 0,
		approved: 0,
		rejected: 0,
	});
	const [serviceType, setServiceType] = useState('');

	// Setting Title
	useEffect(() => {
		setTitle('Requests List');
	}, []);

	// For Stats
	useEffect(() => {
		let pending = 0, approved = 0, rejected = 0;
		requests.forEach((request) => {
			switch (request.status) {
				case 'Accepted':
					approved += 1;
					break;
				case 'Rejected':
					rejected += 1;
					break;
				case 'Pending':
					pending += 1;
					break;
			}
		});
		setStats({ pending, approved, rejected });
	}, [requests]);

	return (
		<section className="grid gap-8 w-full">
			{/* Stats */}
			<div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 cursor-pointer">
				<div
					onClick={() => setRequests(requestsList.filter(r => r.status === 'Accepted'))}
					className="border-2 rounded-lg p-6 grid gap-2"
				>
					<div className="flex items-center justify-between">
						<h4 className="text-base">Approved</h4>
						<Verified className="bg-green-100 text-green-500 w-10 h-10 rounded-md p-1.5" />
					</div>
					<h1 className="text-3xl font-semibold">{Stats.approved}</h1>
				</div>
				<div
					onClick={() => setRequests(requestsList.filter(r => r.status === 'Pending'))}
					className="border-2 rounded-lg p-6 grid gap-2"
				>
					<div className="flex items-center justify-between">
						<h4 className="text-base">Pending</h4>
						<Clock className="bg-yellow-100 text-yellow-500 w-10 h-10 rounded-md p-1.5" />
					</div>
					<h1 className="text-3xl font-semibold">{Stats.pending}</h1>
				</div>
				<div
					onClick={() => setRequests(requestsList.filter(r => r.status === 'Rejected'))}
					className="border-2 rounded-lg p-6 grid gap-2"
				>
					<div className="flex items-center justify-between">
						<h4 className="text-base">Rejected</h4>
						<CircleX className="bg-red-100 text-red-500 w-10 h-10 rounded-md p-1.5" />
					</div>
					<h1 className="text-3xl font-semibold">{Stats.rejected}</h1>
				</div>
			</div>

			{/* Table */}
			<div className="p-6 border-2 rounded-xl">
				<h1 className="text-2xl font-semibold">Request Lists</h1>
				<DataTable data={requests} columns={RequestColumns} additionalFilters={
					<Select
						placeholder="Service Type"
						value={serviceType}
						onValueChange={(value) => {
							if (value === '' || value === 'all') {
								setRequests(requestsList);
							} else {
								setRequests(requestsList.filter((request) => request.serviceType === value));
								setServiceType(value)
							}
						}}
					>
						<SelectItem value={'all'}>All Services</SelectItem>
						{cfsServices.map((service, index) => (
							<SelectItem key={index} value={service.id}>{service.title}</SelectItem>
						))}
					</Select>
				} />
			</div>
		</section>
	)
}

