'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import pbclient from '@/lib/db';
import {
  Building, CheckCircle2, CircleUser, Download, File, FileDown, FileImage,
  FileText, ImageIcon, Mail, MessageCircle, Package2, Pencil, Phone
} from "lucide-react";

export default function PricingPage() {
  const { jobOrderId } = useParams();
  const [requestData, setRequestData] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const record = await pbclient.collection('pricing_requests').getOne(jobOrderId);
        const docs = await pbclient.collection('pricing_documents').getFullList({
          filter: `request_id='${jobOrderId}'`
        });
        setRequestData(record);
        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching pricing request:', error);
      }
    };

    if (jobOrderId) fetchData();
  }, [jobOrderId]);

  // if (!requestData) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-6 min-h-screen">
      {/* Header */}
      <div className="py-2 border-b-4 border-secondary/30">
        <h1 className="flex gap-2 font-semibold text-xl text-black">
          <FileText size={24} className='mt-1' /> View Pricing Request - #{requestData?.req_id}
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Customer Profile */}
        <div className="bg-white shadow-md rounded-md p-2 text-black">
          <div className="p-4">
            <h2 className="flex gap-2 text-xl font-semibold">
              <CircleUser size={25} className='text-foreground' /> Customer Profile
            </h2>
            <div className="flex gap-4 items-center justify-between px-8 mt-4">
              <div className="bg-secondary/20 p-2 rounded-full"><Building className="w-10 h-10" /></div>
              <div className="border-b-4 border-secondary/30 pb-2">
                <p className="font-medium text-md px-2">{requestData?.customer_name}</p>
              </div>
            </div>
            <div className="mt-4 px-4">
              <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Contact Person:</span>{requestData?.contact_person}</p>
              <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Email:</span>{requestData?.email}</p>
              <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Location:</span>{requestData?.location}</p>
              <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Phone:</span>{requestData?.phone}</p>
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="bg-white shadow-md rounded-md p-2 text-black">
          <div className="p-4">
            <h2 className="flex gap-2 text-xl font-semibold">
              <Package2 size={25} className='text-foreground' /> Requested Details
            </h2>
          </div>
          <div className="px-4">
            <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Service Provider:</span>{requestData?.service_provider}</p>
            <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Preferable Rate:</span>₹{requestData?.preferable_rate}</p>
            <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>DPD / Non-DPD:</span>{requestData?.dpd_type}</p>
            <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Container Type:</span>{requestData?.container_type}</p>
            <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Containers per Month:</span>{requestData?.containers_per_month}</p>
            <p className="text-sm grid grid-cols-2 gap-2 mb-2">
              <span>Status:</span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {requestData?.status}
              </span>
            </p>
            <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Request Date:</span>{requestData?.request_date}</p>
            <p className="text-sm grid grid-cols-2 gap-2 mb-2"><span>Additional Notes:</span>{requestData?.notes || '--'}</p>
          </div>
        </div>

        {/* Tools */}
        <div className="bg-white shadow-md text-black rounded-md p-4 space-y-3">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Tools
          </h2>
          <button className="w-full flex items-center justify-between border rounded-md px-3 py-2 hover:bg-secondary/20">
            <span>Edit Request</span>
            <Pencil className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-between border rounded-md px-3 py-2 bg-green-100 text-green-700">
            <span>Status:</span>
            <span className="font-semibold">{requestData?.status}</span>
          </div>
          <button className="w-full flex items-center justify-between bg-blue-600 text-white px-3 py-2 rounded-md">
            <span>Support Chat</span>
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Documents */}
      <div className="border border-secondary/30 rounded-lg p-4 shadow-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Documents
          </h2>
          <button className="flex items-center gap-1 text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">
            <Download className="w-4 h-4" /> Download All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <div key={index} className="border border-secondary/30 rounded-md p-4 flex flex-col items-center bg-white">
              <div className="flex items-center gap-2 mb-2 w-full">
                {doc.type === 'pdf' ? (
                  <File className="w-5 h-5 text-red-500" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-green-600" />
                )}
                <span className="font-medium text-sm truncate">{doc.file}</span>
                <a href={pbclient.getFileUrl(doc, doc.file)} target="_blank" rel="noreferrer">
                  <FileDown className="w-4 h-4 ml-auto cursor-pointer" />
                </a>
              </div>
              <div className="h-24 w-full bg-gray-100 flex items-center justify-center rounded">
                {doc.type === 'pdf' ? (
                  <FileText className="w-10 h-10 text-gray-400" />
                ) : (
                  <FileImage className="w-10 h-10 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
