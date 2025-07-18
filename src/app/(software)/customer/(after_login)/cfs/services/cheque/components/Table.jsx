import { Download, Eye } from 'lucide-react';
import { DataTable } from '@/components/ui/Table';
import { cheques } from '@/constants/cfs/cheque';

export default function Table() {
  const columns = [
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
      id: 'invoiceId',
      accessorKey: 'invoiceId',
      header: 'Invoice ID',
      filterable: true,
      cell: ({ row }) => <div>{row.original.invoiceId}</div>,
    },
    {
      id: 'date',
      accessorKey: 'date',
      header: 'Date',
      filterable: true,
      cell: ({ row }) => <div>{row.original.date}</div>,
    },
    {
      id: 'bankName',
      accessorKey: 'bankName',
      header: 'Bank Name',
      filterable: true,
      cell: ({ row }) => <div>{row.original.bankName}</div>,
    },
    {
      id: 'amount',
      accessorKey: 'amount',
      header: 'Amount',
      filterable: true,
      cell: ({ row }) => <div>Rs. {row.original.amount.toLocaleString()}</div>,
    },
    {
      id: 'chequeNo',
      accessorKey: 'chequeNo',
      header: 'Cheque No.',
      filterable: true,
      cell: ({ row }) => <div>{row.original.chequeNo}</div>,
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
    <div className="border rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">Cheque Payments</h2>
      <DataTable columns={columns} data={cheques} />
    </div>
  )
};
