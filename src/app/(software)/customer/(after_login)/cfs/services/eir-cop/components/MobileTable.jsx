import React, { useState } from 'react';
import { Search, Download, Eye, } from 'lucide-react';
import Input from '@/components/ui/Input';
import { eirCops } from '@/constants/cfs/eir-cop';
import Link from 'next/link';


export default function MobileTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [accordian, setAccordian] = useState(false);

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

  const filteredRequests = eirCops.filter(request => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.containerNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="border rounded-xl flex flex-col p-4 bg-[var(--accent)] shadow-md shadow-foreground/40">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold text-foreground mb-4">Receipt List</h2>

        <div className="px-4 py-8 flex items-center justify-between">
          <div className="relative flex-1 mr-2">
            <Input
              type="text"
              placeholder="Search by ID, Order Id or Container No."
              className="pl-8 w-full bg-[var(--accent)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="px-4 pb-4">
          {filteredRequests.map((request, index) => (
            <div key={index} className="bg-[var(--accent)] shadow-md shadow-foreground/40 border border-foreground rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(request.status)}`}>
                  {request.status}
                </span>
                <h1 className="font-medium"># {request.id}</h1>
              </div>
              <div className="flex justify-between items-center pt-1">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Job Order Id: {request.jobOrderId}</p>
                  <p className="text-[12px] text-gray-600 mb-1">Date: {request.date}</p>
                  {
                    accordian && (
                      <>
                        <p className="text-sm text-gray-600 mb-1">Consignee:  {request.consigneeName}</p>
                        <p className="text-sm text-gray-600 mb-1">Container: {request.containerNo}</p>
                        <p className="text-sm text-gray-600 mb-1">Type: {request.type}</p>
                        <p className="text-sm text-gray-600 mb-1">Movement Type: {request.movementType}</p>
                        <p className="text-sm text-gray-600 mb-1">Condition In: {request.conditionIn}</p>
                        <p className="text-sm text-gray-600 mb-1">Condition Out: {request.conditionOut}</p>
                        <p className="text-sm text-gray-600 mb-1">Remarks: {request.remarks}</p>
                      </>
                    )
                  }
                </div>
                <div className='flex gap-3 items-center'>
                  <Eye
                    size={20}
                    className="cursor-pointer text-primary"
                    onClick={() => console.log('View details for', row.original.id)}
                  />
                  <Download
                    size={20}
                    className="cursor-pointer text-primary"
                    onClick={() => console.log('Download files for', row.original.id)}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <span>more</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

