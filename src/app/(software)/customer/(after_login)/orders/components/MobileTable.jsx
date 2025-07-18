import React, { useState } from 'react';
import { Search, Download, } from 'lucide-react';
import Input from '@/components/ui/Input';
import { orders } from '@/constants/orders';

export default function MobileRequestList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = orders.filter(request => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.containerNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });


  const getStatusBadgeClass = (status) => {
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
    <div className="border rounded-xl flex flex-col p-4">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold text-green-900 mb-4">Request List</h2>
        <div className="px-4 py-8 flex items-center justify-between">
          <div className="relative flex-1 mr-2">
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

        <div className="px-4 pb-4">
          {filteredRequests.map((request, index) => (
            <div key={index} className="bg-[var(--accent)] rounded-lg p-3 mb-3 shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium"># {request.id}</div>
                <div className='flex gap-2 items-center'>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(request.status)}`}>
                    {request.status}
                  </span>
                  <Download
                    className="cursor-pointer text-[var(--primary)]"
                    size={18}
                    onClick={() => {
                      const link = document.createElement('a');
                      const url = request.filePath
                      link.setAttribute('href', url)
                      link.setAttribute('download', url)
                      link.style.visibility = 'hidden'
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-1">CFS: {request.cfs.title}</div>
              <div className="text-sm text-gray-600 mb-1">Container: {request.containerNo}</div>
              <p className="text-sm text-gray-600 mb-1">IGM:- {request.IGMNo}</p>
              <p className="text-sm text-gray-600 mb-1">BL:-{request.BLNo}</p>
              <div className="text-sm text-gray-600 mb-1">BOE: {request.BOENo}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

