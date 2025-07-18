export const dashboardCols = [
	{
		id: 'order-no',
		accessorKey: 'id',
		header: 'Order ID',
		filterable: true,
		cell: ({ row }) => <div>{row.original.id}</div>,
	},
	{
		id: 'bl',
		accessorKey: 'bl',
		header: 'BL No.',
		filterable: true,
		cell: ({ row }) => <div>{row.original.BLNo}</div>,
	},
	{
		id: 'boe',
		accessorKey: 'boe',
		header: 'BOE No.',
		filterable: true,
		cell: ({ row }) => <div>{row.original.BOENo}</div>,
	},
	{
		id: 'igm',
		accessorKey: 'igm',
		header: 'IGM No.',
		filterable: true,
		cell: ({ row }) => <div>{row.original.IGMNo}</div>,
	},
	{
		id: 'status',
		accessorKey: 'status',
		header: 'Status',
		filterable: true,
		cell: ({ row }) => <div className={`${getStatusColor(row.original.status)} rounded-xl px-4 py-2 text-center`}>{row.original.status}</div>,
	},
]

const getStatusColor = (status) => {
	switch (status) {
		case 'Accepted':
			return 'bg-green-100 text-green-800 border border-green-800';
		case 'Pending':
			return 'bg-yellow-100 text-yellow-800 border border-yellow-800';
		case 'Rejected':
			return 'bg-red-100 text-red-800 border border-red-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};
