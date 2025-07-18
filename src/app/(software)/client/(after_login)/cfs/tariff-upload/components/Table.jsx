import { tariffs } from "@/constants/orders";
import { DataTable } from "@/components/ui/Table";
import { Download } from "lucide-react";

const columns = [
	{
		id: 'uploadedOn',
		accessorKey: 'uploadedOn',
		header: 'Uploaded On',
		filterable: true,
		cell: ({ row }) => <div>{row.original.uploadedOn}</div>,
	},
	{
		id: 'order-id',
		accessorKey: 'order.id',
		header: 'Order ID',
		filterable: true,
		cell: ({ row }) => <div>{row.original.order.id}</div>,
	},
	{
		id: 'file',
		accessorKey: 'filePath',
		header: 'File',
		filterable: false,
		cell: ({ row }) => <div>{row.original.filePath}</div>,
	},
	{
		id: 'remarks',
		accessorKey: 'remarks',
		header: 'Remarks',
		filterable: true,
		cell: ({ row }) => <div>{row.original.remarks}</div>,
	},
	{
		id: 'actions',
		accessorKey: 'actions',
		header: 'Actions',
		filterable: false,
		cell: ({ row }) => (
			<Download
				className="cursor-pointer text-[var(--primary)]"
				onClick={() => {
					const link = document.createElement('a');
					const url = row.original.filePath
					link.setAttribute('href', url)
					link.setAttribute('download', url)
					link.style.visibility = 'hidden'
					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
				}}
			/>
		),
	}
]

export default function Table() {
	return (
		<div className="border-2 border-[var(--primary)] p-4 rounded-xl">
			<h1 className="text-lg font-semibold">Uploaded Tariffs</h1>
			<DataTable
				columns={columns}
				data={tariffs}
			/>
		</div>
	)
}

