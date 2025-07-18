import { Download, Eye, LayoutGrid } from 'lucide-react';
import { DataTable } from '@/components/ui/Table';
import { orders } from '@/constants/orders';
import Button from '@/components/ui/Button';

export default function RequestList() {
  const columns = [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'Order ID',
      filterable: true,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      id: 'cfs',
      accessorKey: 'cfs',
      header: 'CFS Provider',
      filterable: true,
      cell: ({ row }) => <div>{row.original.cfs.title}</div>,
    },
    {
      id: 'igm',
      accessorKey: 'igm',
      header: 'IGM Number',
      filterable: true,
      cell: ({ row }) => <div>{row.original.IGMNo}</div>,
    },
    {
      id: 'bl',
      accessorKey: 'bl',
      header: 'BL Number',
      filterable: true,
      cell: ({ row }) => <div>{row.original.BLNo}</div>,
    },
    {
      id: 'boe',
      accessorKey: 'boe',
      header: 'BOE Number',
      filterable: true,
      cell: ({ row }) => <div>{row.original.BOENo}</div>,
    },
    {
      id: 'container-no',
      accessorKey: 'containerNo',
      header: 'Container No.',
      filterable: true,
      cell: ({ row }) => <div>{row.original.containerNo}</div>,
    },
    {
      id: 'uploadedOn',
      accessorKey: 'uploadedOn',
      header: 'Uploaded On',
      filterable: true,
      cell: ({ row }) => <div>{row.original.uploadedOn}</div>,
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
        <div className='flex gap-2 items-center'>
          <Button title={'View'} icon={<Eye className='w-4 h-4' />} textSize='text-xs' className='rounded-md' variant={'secondary'} />
          <Button title={'Edit'} icon={<LayoutGrid className='w-4 h-4' />} textSize='text-xs' className='rounded-md' />
        </div>
      ),
    }
  ];

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

  return (
    <div className="border rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold text-green-900 mb-4">Previous Orders</h2>
      <DataTable columns={columns} data={orders} />
    </div>
  )
};
