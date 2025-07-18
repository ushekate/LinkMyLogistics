import React, { useState } from 'react';
import { Search, Download, Eye, CircleCheckBig, CircleX, MessageSquare, } from 'lucide-react';
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
        <h2 className="text-xl font-semibold text-green-900 mb-4">Profile</h2>        
      </div>
    </div>
  );
}