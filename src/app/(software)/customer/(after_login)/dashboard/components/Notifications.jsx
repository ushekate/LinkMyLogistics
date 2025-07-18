import { Bell } from "lucide-react";

export default function Notifications() {
	return (
		<div className="border p-6 rounded-xl bg-[var(--accent)] shadow-md shadow-foreground/40">
			<h1 className="text-xl font-semibold pb-2">Notifications</h1>
			{notificationsList.map((notification, index) => (
				<h1 key={index} className="flex items-center gap-4 py-2">
					<Bell className="text-[var(--primary)]" />
					<span>{notification.title}</span>
				</h1>
			))}

		</div>
	)
}

const notificationsList = [
	{
		title: 'Tariff updated for May 2025.'
	},
	{
		title: 'Your recent order was delivered on 11-May-2025.'
	},
];
