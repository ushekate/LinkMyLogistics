import { useState } from 'react';
import { Search, Download, Eye, } from 'lucide-react';
import Input from '@/components/ui/Input';
import { weighmentSlips } from '@/constants/cfs/weighment-slips';

export default function MobileTable() {
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredRequests = weighmentSlips.filter(request => {
    const matchesSearch = searchQuery === '' ||
      request.order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.containerNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="border rounded-xl flex flex-col p-4">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold text-foreground mb-4">Weightments List</h2>

        <div className="py-8">
          <div className="flex items-center">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search by ID, Order Id or Container No."
                value={searchQuery}
                className="pl-8 w-full bg-[var(--accent)]"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {filteredRequests.map((request, index) => (
          <div key={index} className="bg-[var(--accent)] rounded-lg p-3 mb-3 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(request.status)}`}>
                {request.status}
              </span>
            </div>
            <h1 className="font-medium"># {request.id}</h1>
            <p className="text-sm text-gray-600 mb-1">Job Order Id: {request.jobOrderId}</p>
            <p className="text-sm text-gray-600 mb-1">Consignee:  {request.consigneeName}</p>
            <p className="text-sm text-gray-600 mb-1">Date: {request.date}</p>
            <p className="text-sm text-gray-600 mb-1">Container: {request.containerNo}</p>
            <p className="text-sm text-gray-600 mb-1">Remarks: {request.remarks}</p>
            <p className="text-sm text-gray-600 mb-1">Receipt No.: {request.receiptNo}</p>
            <p className="text-sm text-gray-600 mb-1">Gross Weight: {request.grossWeight}</p>
            <p className="text-sm text-gray-600 mb-1">Tare Weight: {request.tareWeight}</p>
            <p className="text-sm text-gray-600 mb-1">Net Weight: {request.netWeight}</p>
            <p className="text-sm text-gray-600 mb-1">Cargo Type: {request.cargoType}</p>
            <div className="flex justify-end items-center pt-4">
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
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
