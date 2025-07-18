import { DataTable } from '@/components/ui/Table';
import { weighmentSlips } from '@/constants/cfs/weighment-slips';
import { Download, Eye, } from 'lucide-react';
import React from 'react';

export default function Table() {
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

  const columns = [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
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
      id: 'container-no',
      accessorKey: 'containerNo',
      header: 'Container No.',
      filterable: true,
      cell: ({ row }) => <div>{row.original.containerNo}</div>,
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
      id: 'receiptNo',
      accessorKey: 'receiptNo',
      header: 'Receipt No.',
      filterable: true,
      cell: ({ row }) => <div>{row.original.receiptNo}</div>,
    },
    {
      id: 'grossWeight',
      accessorKey: 'grossWeight',
      header: 'Gross Weight',
      filterable: true,
      cell: ({ row }) => <div>{row.original.grossWeight.toLocaleString()} Tons</div>,
    },
    {
      id: 'tareWeight',
      accessorKey: 'tareWeight',
      header: 'Tare Weight',
      filterable: true,
      cell: ({ row }) => <div>{row.original.tareWeight.toLocaleString()} Tons</div>,
    },
    {
      id: 'netWeight',
      accessorKey: 'netWeight',
      header: 'Net Weight',
      filterable: true,
      cell: ({ row }) => <div>{row.original.netWeight.toLocaleString()} Tons</div>,
    },
    {
      id: 'cargoType',
      accessorKey: 'cargoType',
      header: 'Cargo Type',
      filterable: true,
      cell: ({ row }) => <div>{row.original.cargoType}</div>,
    },
    {
      id: 'date',
      accessorKey: 'date',
      header: 'Date',
      filterable: true,
      cell: ({ row }) => (
        <div>
          {new Date(row.original.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </div>
      ),
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
  ]

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold">Weightments List</h2>
      <DataTable columns={columns} data={weighmentSlips} />
    </div>
  );
};
