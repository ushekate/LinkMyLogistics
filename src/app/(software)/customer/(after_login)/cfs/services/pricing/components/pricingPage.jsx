'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import pbclient from '@/lib/db';
import Link from 'next/link';
import {
  CalendarDays,
  Download,
  FileText,
  Image as ImageIcon,
  Video,
  ArrowLeft,
} from 'lucide-react';

export default function PricingPage() {
  const params = useParams();
  const id = params?.id;
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const record = await pbclient.collection('pricing_requests').getOne(id, {
          expand: 'customer',
        });
        setRequest(record);
      } catch (error) {
        console.error('Failed to fetch request:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const renderDocuments = () => {
    if (!request?.documents?.length) {
      return <p className="text-gray-500">No documents</p>;
    }

    return (
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        {request.documents.map((doc, index) => {
          const ext = doc.split('.').pop().toLowerCase();
          const fileUrl = `${pbclient.baseUrl}/api/files/pricing_requests/${request.id}/${doc}`;
          const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
          const isVideo = ['mp4', 'mov', 'webm'].includes(ext);

          return (
            <div key={index} className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isImage ? <ImageIcon /> : isVideo ? <Video /> : <FileText />}
                <p className="text-sm truncate w-40">{doc}</p>
              </div>
              <a href={fileUrl} target="_blank" rel="noreferrer" download>
                <Download className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (!request) return <p className="p-6 text-red-500">Request not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Link href="/customer/(after_login)/cfs/services/pricing" className="flex items-center text-sm text-blue-600 mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Pricing Requests
      </Link>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">Request ID: {request.req_id}</h2>
            <p className="text-sm text-gray-500">
              {request.expand?.customer?.name || request.customer || 'Customer'}
            </p>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(request.status)}`}>
            {request.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Service Provider</p>
            <p>{request.service_provider}</p>
          </div>
          <div>
            <p className="text-gray-500">Preferable Rate</p>
            <p>{request.preferable_rate}</p>
          </div>
          <div>
            <p className="text-gray-500">DPD Type</p>
            <p>{request.dpd_type}</p>
          </div>
          <div>
            <p className="text-gray-500">Container Type</p>
            <p>{request.container_type}</p>
          </div>
          <div>
            <p className="text-gray-500">Containers per Month</p>
            <p>{request.containers_per_month}</p>
          </div>
          <div>
            <p className="text-gray-500">Request Date</p>
            <p>
              <CalendarDays className="inline w-4 h-4 mr-1" />
              {new Date(request.request_date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500">Notes</p>
            <p>{request.notes || '—'}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500 font-medium mb-2">Documents</p>
          {renderDocuments()}
        </div>
      </div>
    </div>
  );
}

