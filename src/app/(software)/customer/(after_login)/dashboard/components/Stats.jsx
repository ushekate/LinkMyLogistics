import { useEffect, useState } from "react"

export default function Stats({ orders = [] }) {

	const [Stats, setStats] = useState({
		total: 0,
		approved: 0,
		rejected: 0,
		pending: 0,
	});

	useEffect(() => {
		let pending = 0, approved = 0, rejected = 0;

		if (orders.length === 0) {
			setStats((prev) => {
				if (prev.total === 0 && prev.approved === 0 && prev.rejected === 0 && prev.pending === 0) {
					return prev;
				}
				return {
					total: 0,
					approved: 0,
					rejected: 0,
					pending: 0,
				};
			});
			return;
		}

		orders.forEach((order) => {
			if (order.status === 'Accepted') approved++;
			else if (order.status === 'Rejected') rejected++;
			else if (order.status === 'Pending') pending++;
		});

		const newStats = {
			total: orders.length,
			approved,
			rejected,
			pending,
		};

		setStats((prev) => {
			if (
				prev.total === newStats.total &&
				prev.approved === newStats.approved &&
				prev.rejected === newStats.rejected &&
				prev.pending === newStats.pending
			) {
				return prev;
			}
			return newStats;
		});
	}, []);

	return (
		<div className="md:w-full w-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
			<div className="border bg-[var(--accent)] shadow-md shadow-foreground/40 rounded-lg p-6 grid gap-2 w-full">
				<h4 className="text-sm">Total Orders</h4>
				<h1 className="text-3xl font-semibold">{Stats.total}</h1>
			</div>

			<div className="border bg-[var(--accent)] shadow-md shadow-foreground/40 rounded-lg p-6 grid gap-2 w-full">
				<h4 className="text-sm">Approved Orders</h4>
				<h1 className="text-3xl font-semibold">{Stats.approved}</h1>
			</div>

			<div className="border bg-[var(--accent)] shadow-md shadow-foreground/40 rounded-lg p-6 grid gap-2 w-full">
				<h4 className="text-sm">Rejected Orders</h4>
				<h1 className="text-3xl font-semibold">{Stats.rejected}</h1>
			</div>
		</div>
	)
}
