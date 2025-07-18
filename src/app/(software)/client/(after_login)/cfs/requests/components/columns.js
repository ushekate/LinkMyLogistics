import Button from "@/components/ui/Button";
import { CircleCheckBig, CircleX, Download, Pencil, Trash } from "lucide-react";

export const RequestColumns = [
	{
		id: 'id',
		accessorKey: 'id',
		header: 'Request ID',
		filterable: true,
		cell: ({ row }) => <div>{row.original.id}</div>,
	},
	{
		id: 'order-no',
		accessorKey: 'order.id',
		header: 'Order ID',
		filterable: true,
		cell: ({ row }) => <div>{row.original.order.id}</div>,
	},
	{
		id: 'date',
		accessorKey: 'date',
		header: 'Date',
		filterable: true,
		cell: ({ row }) => <div>{row.original.date}</div>,
	},
	{
		id: 'remarks',
		accessorKey: 'remarks',
		header: 'Customer Remarks',
		filterable: true,
		cell: ({ row }) => <div>{row.original.remarks}</div>,
	},
	{
		id: 'reason',
		accessorKey: 'remarks',
		header: 'Reason',
		filterable: true,
		cell: ({ row }) => <div>{row.original.reason}</div>,
	},
	{
		id: 'serviceType',
		accessorKey: 'serviceType',
		header: 'Service Type',
		filterable: true,
		cell: ({ row }) => <div>{row.original.serviceType}</div>,
	},
	{
		id: 'status',
		accessorKey: 'status',
		header: 'Status',
		filterable: true,
		cell: ({ row }) => <div className={`${getStatusColor(row.original.status)} rounded-xl px-4 py-2 text-center`}>{row.original.status}</div>,
	},
	{
		id: 'actions',
		accessorKey: 'actions',
		header: 'Actions',
		filterable: false,
		cell: ({ row }) => (
			<div className='flex gap-2 items-center justify-center w-full'>
				{
					row.original.status === 'Pending' && (
						<>
							<CircleCheckBig className="cursor-pointer text-[var(--primary)] w-6 h-6" />
							<CircleX className="cursor-pointer text-[var(--primary)] w-6 h-6" />
						</>
					)
				}
				<Download
					className="cursor-pointer text-[var(--primary)]"
				/>
			</div>
		),
	}
]

const getStatusColor = (status) => {
	switch (status) {
		case 'Accepted':
			return 'bg-green-100 text-green-800';
		case 'Pending':
			return 'bg-yellow-100 text-yellow-800';
		case 'Rejected':
			return 'bg-red-100 text-red-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};

