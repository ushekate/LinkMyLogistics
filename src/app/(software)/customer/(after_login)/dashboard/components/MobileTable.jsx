import React, { useState } from 'react';
import { Search, Download, } from 'lucide-react';
import Input from '@/components/ui/Input';
import { orders } from '@/constants/orders';

export default function MobileTable() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = orders
    .slice(0, 5)
    .filter(request => {
      const matchesSearch =
        request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.containerNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.order.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });


  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800 shadow-xs shadow-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 shadow-xs shadow-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800 shadow-xs shadow-green-800';
      default:
        return 'bg-gray-100 text-gray-800 shadow-xs shadow-green-800';
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="py-8 flex items-center justify-between">
          <div className="relative flex-1 px-1">
            <Input
              type="text"
              placeholder="Search by Request ID"
              className="pl-8 w-full bg-[var(--accent)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="px-1 pb-4">
          {filteredRequests.map((request, index) => (
            <div key={index} className="bg-[var(--accent)] border shadow-md shadow-foreground/40 rounded-lg p-3 mb-3">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium"># {request.id}</div>
                <div className='flex gap-2 items-center'>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(request.status)}`}>
                    {request.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">IGM:- {request.IGMNo}</p>
              <p className="text-sm text-gray-600 mb-1">BL:-{request.BLNo}</p>
              <div className="text-sm text-gray-600 mb-1">BOE: {request.BOENo}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

