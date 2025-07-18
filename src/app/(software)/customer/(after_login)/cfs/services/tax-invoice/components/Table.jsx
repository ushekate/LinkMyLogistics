import { Download, Eye } from 'lucide-react';
import { DataTable } from '@/components/ui/Table';
import { taxInvoices } from '@/constants/cfs/tax-invoice';

export default function Table() {
  const columns = [
    {
      id: 'order-no',
      accessorKey: 'order.id',
      header: 'Order ID',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>{row.original.order.id}</div>,
    },
    {
      id: 'invoiceNo',
      accessorKey: 'invoiceNo',
      header: 'Invoice No.',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>{row.original.invoiceNo}</div>,
    },
    {
      id: 'consigneeName',
      accessorKey: 'consigneeName',
      header: 'Consignee Name',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>{row.original.consigneeName}</div>,
    },
    {
      id: 'chaName',
      accessorKey: 'chaName',
      header: 'CHA Name',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>{row.original.chaName}</div>,
    },
    {
      id: 'gstin',
      accessorKey: 'gstin',
      header: 'GSTIN',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>{row.original.gstin}</div>,
    },
    {
      id: 'gstTotal',
      accessorKey: 'gstTotal',
      header: 'GST Amount',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>Rs. {row.original.gstTotal.toLocaleString()}</div>,
    },
    {
      id: 'grossTotal',
      accessorKey: 'grossTotal',
      header: 'Gross Total',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>Rs. {row.original.grossTotal.toLocaleString()}</div>,
    },
    {
      id: 'paymentMode',
      accessorKey: 'paymentMode',
      header: 'Payment Mode',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>{row.original.paymentMode}</div>,
    },
    {
      id: 'remarks',
      accessorKey: 'remarks',
      header: 'Remarks',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>{row.original.remarks}</div>,
    },
    {
      id: 'uploadedOn',
      accessorKey: 'uploadedOn',
      header: 'Uploaded On',
      filterable: true,
      cell: ({ row }) => <div className='text-xs'>{row.original.date}</div>,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      filterable: true,
      cell: ({ row }) => <div className={`${getStatusClass(row.original.status)} rounded-xl px-2 py-1 text-center text-xs flex`}>{row.original.status}</div>,
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
      <h2 className="text-xl font-semibold text-green-900 mb-4">Invoices List</h2>
      <DataTable columns={columns} data={taxInvoices} />
    </div>
  )
};
