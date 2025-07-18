import { Download, Eye, } from 'lucide-react';
import { DataTable } from '@/components/ui/Table';
import { rescannings } from '@/constants/cfs/rescanning';

export default function Table() {
  const columns = [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'Rescan ID',
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
      id: 'consigneeName',
      accessorKey: 'consigneeName',
      header: 'Consignee Name',
      filterable: true,
      cell: ({ row }) => <div>{row.original.consigneeName}</div>,
    },
    {
      id: 'job-order-id',
      accessorKey: 'job-order-id',
      header: 'Job-Order Id',
      filterable: true,
      cell: ({ row }) => <div>{row.original.jobOrderId}</div>,
    },
    {
      id: 'container-no',
      accessorKey: 'containerNo',
      header: 'Container No.',
      filterable: true,
      cell: ({ row }) => <div>{row.original.containerNo}</div>,
    },
    {
      id: 'Date',
      accessorKey: 'Date',
      header: 'Requested Date',
      filterable: true,
      cell: ({ row }) => <div>{row.original.date}</div>,
    },
    {
      id: 'type',
      accessorKey: 'type',
      header: 'Type',
      filterable: true,
      cell: ({ row }) => <div>{row.original.type}</div>,
    },
    {
      id: 'scannedBy',
      accessorKey: 'scannedBy',
      header: 'Scanned By',
      filterable: true,
      cell: ({ row }) => <div>{row.original.scannedBy}</div>,
    },
    {
      id: 'remarks',
      accessorKey: 'remarks',
      header: 'Remarks',
      filterable: true,
      cell: ({ row }) => <div>{row.original.remarks}</div>,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      filterable: true,
      cell: ({ row }) => <div className={`${getStatusClass(row.original.status)} rounded-xl px-4 py-2 text-center`}>{row.original.status}</div>,
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: 'Actions',
      filterable: false,
      cell: ({ row }) => (
        <div className='flex gap-2 items-center'>
          <Eye
            size={18}
            className="cursor-pointer text-primary"
            onClick={() => console.log('View details for', row.original.id)}
          />
          <Download
            size={18}
            className="cursor-pointer text-primary"
            onClick={() => console.log('Download files for', row.original.id)}
          />
        </div>
      ),
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border border-green-500';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-500';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border border-red-500';
      default:
        return 'bg-gray-300 text-gray-800 border border-gray-800';
    }
  };

  return (
    <div className="border border-foreground rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">Container Re-scannings</h2>
      <DataTable columns={columns} data={rescannings} />
    </div>
  )
};
