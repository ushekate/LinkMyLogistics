import { CircleCheckBig, CircleDashed, CircleX, Database, ScrollText } from "lucide-react";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#ef4444', '#14b8a6', '#fbbf24', '#1e3a8a', '#f97316'];

const lineData = [
	{ month: 'Jan', orders: 65 },
	{ month: 'Feb', orders: 75 },
	{ month: 'Mar', orders: 100 },
	{ month: 'Apr', orders: 120 },
	{ month: 'May', orders: 140 },
];

const approvedOrdersData = [
	{ month: 'Jan', orders: 50 },
	{ month: 'Feb', orders: 70 },
	{ month: 'Mar', orders: 60 },
	{ month: 'Apr', orders: 75 },
	{ month: 'May', orders: 60 },
];

const serviceData = [
	{ name: 'Priority Movement', value: 400 },
	{ name: 'Weightment Slip', value: 300 },
	{ name: 'Special Equipment', value: 200 },
	{ name: 'Container Staging', value: 150 },
	{ name: 'Re-scanning', value: 100 },
];

const requests = [
	{ id: '#ORD1023', service: 'Priority Movement', status: 'Approved' },
	{ id: '#ORD1022', service: 'CFS Request', status: 'In Progress' },
	{ id: '#ORD1019', service: 'Special Equipment', status: 'Rejected' },
];

const getStatusColor = (status) => {
	switch (status) {
		case 'Approved': return 'text-green-600';
		case 'Rejected': return 'text-red-600';
		case 'In Progress': return 'text-yellow-600';
		default: return 'text-gray-600';
	}
};

export default function Stats({ orders = [] }) {

	const [Stats, setStats] = useState({
		total: 0,
		approved: 0,
		rejected: 0,
		pending: 0,
	});


	const approvedPercent = (Stats.approved / Stats.total) * 100;
	const rejectedPercent = (Stats.rejected / Stats.total) * 100;

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
		<div>
			<div className="md:w-full w-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
				<div className="bg-accent rounded-lg p-6 grid gap-2 shadow-2xl w-full">
					<div className="flex justify-between">
						<div className="">
							<h4 className="text-sm flex">Total Orders</h4>
							<h1 className="text-3xl font-semibold">{Stats.total}</h1>
						</div>
						<div className="border-0 rounded-full bg-amber-50 p-3 h-fit">
							<ScrollText className="text-black" size={25} />
						</div>
					</div>
				</div>


				<div className="bg-accent rounded-lg p-6 grid gap-2 shadow-2xl w-full">
					<div className="flex justify-between">
						<div className="">
							<h4 className="text-sm flex">In Progress</h4>
							<h1 className="text-3xl font-semibold">{Stats.pending}</h1>
						</div>
						<div className="border-0 rounded-full bg-orange-200 p-3 h-fit">
							<CircleDashed className="text-orange-600" size={25} />
						</div>
					</div>
				</div>


				<div className="bg-accent rounded-lg p-6 grid gap-2 shadow-2xl w-full">
					<div className="flex justify-between">
						<div className="">
							<h4 className="text-sm flex">Approved Orders</h4>
							<h1 className="text-3xl font-semibold">{Stats.approved}</h1>
						</div>
						<div className="border-0 rounded-full bg-green-200 p-3 h-fit">
							<CircleCheckBig className="text-green-600" size={25} />
						</div>
					</div>
				</div>


				<div className="bg-accent rounded-lg p-6 grid gap-2 shadow-2xl w-full">
					<div className="flex justify-between">
						<div className="">
							<h4 className="text-sm flex">Rejected Orders</h4>
							<h1 className="text-3xl font-semibold">{Stats.rejected}</h1>
						</div>
						<div className="border-0 rounded-full bg-red-200 p-3 h-fit">
							<CircleX className="text-red-600" size={25} />
						</div>
					</div>
				</div>
			</div>


			{/* Line Chart */}
			<div className="grid md:grid-cols-2 gap-6 py-6 h-fit text-gray-900">

				<div className="bg-accent rounded-xl p-4 shadow-2xl border-0">
					<h2 className="text-lg font-semibold text-black mb-2">Total Order Trends</h2>
					<ResponsiveContainer width="100%" height={220}>
						<LineChart data={lineData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#cce3d2" />
							<XAxis dataKey="month" stroke="#555" />
							<YAxis stroke="#555" />
							<Tooltip />
							<Line
								type="monotone"
								dataKey="orders"
								stroke="#10b981"
								strokeWidth={2}
								dot={{ r: 4, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
				

				{/* Pie Chart */}
				<div className="bg-accent rounded-xl p-4 shadow-2xl border-0">
					<h2 className="text-lg font-semibold mb-2">Service Usage Distribution</h2>
					<div className="flex justify-between">

						<ResponsiveContainer width="50%" height={200}>
							<PieChart>
								<Pie
									data={serviceData}
									cx="50%"
									cy="50%"
									innerRadius={50}
									outerRadius={80}
									dataKey="value"
									paddingAngle={5}
								>
									{serviceData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
						<div className="flex flex-col justify-center pr-[10%]">
							<ul className="text-sm mt-2 space-y-1">
								{serviceData.map((entry, index) => (
									<li key={index} className="flex items-center">
										<span
											className="inline-block w-3 h-3 rounded-full mr-2"
											style={{ backgroundColor: COLORS[index % COLORS.length] }}
										></span>
										{entry.name}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>


			<div className="grid md:grid-cols-2 gap-6 py-6 h-fit text-gray-900">
				{/* Bar Chart */}

				<div className="bg-accent rounded-xl p-4 shadow-2xl border-0">
					<h2 className="text-lg font-semibold text-black mb-2">Approved Orders</h2>
					<ResponsiveContainer width="100%" height={220}>
						<BarChart data={approvedOrdersData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#cce3d2" />
							<XAxis dataKey="month" stroke="#555" />
							<YAxis stroke="#555" />
							<Tooltip />
							<Bar
								dataKey="count"
								fill="#15803d"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
				

				{/* Latest Requests */}
				<div className="bg-accent rounded-xl p-4 shadow-2xl border-0">
					<h2 className="text-lg font-semibold mb-4">Latest Requests</h2>
					<ul className="space-y-4 text-sm">
						{requests.map((req, idx) => (
							<li key={idx} className="flex justify-between border-b pb-2">
								<div>
									<p className="font-medium">{req.id}</p>
									<p className="text-gray-600">{req.service}</p>
								</div>
								<p className={`font-semibold ${getStatusColor(req.status)}`}>
									{req.status}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* </div> */}



		</div>
	)
}
