import React from 'react';
import { DataTable } from '@/components/ui/Table';
import { Eye, Download } from 'lucide-react';
import { jobOrders } from '@/constants/cfs/job-order';

const Table = () => {

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
      header: 'Job ID',
      filterable: true,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      id: 'Order ID',
      accessorKey: 'jobOrderNo',
      header: 'Job Order No.',
      filterable: true,
      cell: ({ row }) => <div>{row.original.order.id}</div>,
    },
    {
      id: 'consigneeName',
      accessorKey: 'consigneeName',
      header: 'Customer Name',
      filterable: true,
      cell: ({ row }) => <div>{row.original.consigneeName}</div>,
    },
    {
      id: 'date',
      accessorKey: 'date',
      header: 'Date',
      filterable: true,
      cell: ({ row }) => <div>{row.original.date}</div>,
    },
    {
      id: 'serviceType',
      accessorKey: 'serviceType',
      header: 'Service',
      filterable: true,
      cell: ({ row }) => <div>{row.original.serviceType}</div>,
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
      cell: ({ row }) => (
        <div className={`px-2 py-1 text-xs rounded-full ${getStatusClass(row.original.status)}`}>
          {row.original.status}
        </div>
      ),
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

  return (
    <div className="border-2 border-[var(--primary)] p-4 rounded-xl mt-8">
      <h1 className="text-lg font-semibold">Job Orders</h1>

      <DataTable
        columns={columns}
        data={jobOrders}
      />
    </div>
  );
};

export default Table;
