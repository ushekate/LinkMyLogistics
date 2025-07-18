'use client';
import React from 'react';
import { Eye, Download, Phone, Mail, FilePlus, Edit, ArrowLeftCircle, RefreshCw, NotebookText, Hourglass, MessageCircle, MessageSquare, FolderUp, User, UserPen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JobDetails = ({ jobData, onBack, onUpload, onEdit, onUpdateStatus }) => {
    const {
        jobId,
        orderNumber,
        customerName,
        service,
        status,
        fromDate,
        toDate,
        createdOn,
        updatedOn,
        remarks,
        documents,
        assignedPersonnel,
    } = jobData;

    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800 border border-green-400';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800 border border-yellow-400';
            case 'Cancelled':
                return 'bg-red-100 text-red-800 border border-red-400';
            default:
                return 'bg-gray-200 text-gray-800 border border-gray-300';
        }
    };

    return (
        <div className="space-y-6">
            {/* Job Info */}
            <div className="bg-accent shadow-lg rounded-xl p-6">
                <h1 className="flex text-2xl font-bold mb-6"><NotebookText size={25} className='mr-2 mt-1' /> Job Information</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 sm:gap-6 gap-6 text-gray-800">
                    <div><span className="text-sm">Job ID</span><div className="font-semibold">{jobId}</div></div>
                    <div><span className="text-sm">Order Number</span><div className="font-semibold">{orderNumber}</div></div>
                    <div><span className="text-sm">Customer</span><div className="font-semibold">{customerName}</div></div>
                    <div><span className="text-sm">Service</span><div className="font-semibold">{service}</div></div>
                    <div className="grid">
                        <span className="text-sm">Status</span>
                        <div className={`inline-block mt-1 text-sm px-3 w-fit py-1 rounded-full ${getStatusClass(status)}`}>
                            {status}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-accent shadow-lg rounded-xl p-6">
                <h2 className="flex text-xl font-semibold mb-4"><Hourglass size={25} className="mr-2 mt1" /> Timeline</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-800">
                    <div><div className="mb-2">From</div><div className="font-medium">{fromDate}</div></div>
                    <div><div className="mb-2">To</div><div className="font-medium">{toDate}</div></div>
                    <div><div className="mb-2">Created On</div><div className="font-medium">{createdOn}</div></div>
                    <div><div className="mb-2">Updated On</div><div className="font-medium">{updatedOn}</div></div>
                </div>
            </div>

            {/* Remarks */}
            <div className="bg-accent shadow-lg rounded-xl p-6 sm:p-6">
                <h2 className="flex text-xl sm:text-xl font-semibold mb-3"><MessageSquare size={25} className='mr-2 mt-1' /> Remarks</h2>
                <p className="text-sm text-gray-800">{remarks}</p>
            </div>

            {/* Documents */}
            <div className="bg-accent shadow-lg rounded-xl p-6 sm:p-6">
                <h2 className="flex text-xl sm:text-xl font-semibold mb-3"><FolderUp size={25} className='mr-2' />Uploaded Documents</h2>
                {documents.length === 0 ? (
                    <p className="text-sm text-gray-800">No documents uploaded.</p>
                ) : (
                    <div className="space-y-4">
                        {documents.map((doc, i) => (
                            <div key={i} className="flex justify-between items-center bg-[#B1CDB3] p-2 rounded-md shadow border-0">
                                <span className="font-medium text-gray-800">{doc.name}</span>
                                <div className="flex gap-2">
                                    <Button><a
                                        href={doc.url}
                                        download
                                        className="text-sm text-white px-3 py-1 rounded flex items-center gap-1"
                                    >
                                        <Download size={14} /> Download
                                    </a></Button>

                                    <Button><a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white px-3 py-1 rounded flex items-center gap-1"
                                    >
                                        <Eye size={14} /> Preview
                                    </a></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Assigned Personnel */}
            <div className="bg-accent shadow-lg rounded-xl p-6">
                <h2 className="flex text-xl font-semibold mb-3"><User size={25} className='mr-2' /> Assigned Personnel</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
                    <div>
                        <div className="mb-2">Assigned By</div>
                        <div className="flex items-center gap-2 font-medium">
                            <UserPen size={16} />{assignedPersonnel.assignedBy}
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">Contact</div>
                        <div className="flex items-center gap-2 font-medium">
                            <Phone size={16} /> {assignedPersonnel.contact}
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">Email</div>
                        <div className="flex items-center gap-2 font-medium">
                            <Mail size={16} /> {assignedPersonnel.email}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-3 pt-4">
                <Button onClick={onBack} variant="outline" className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-100">
                    <ArrowLeftCircle size={16} /> Back
                </Button>
                <Button onClick={onUpload} className="text-white flex items-center gap-2">
                    <FilePlus size={16} /> Upload File
                </Button>
                <Button onClick={onEdit} className="text-white flex items-center gap-2">
                    <Edit size={16} /> Edit Job
                </Button>
                <Button onClick={onUpdateStatus} className="text-white flex items-center gap-2">
                    <RefreshCw size={16} /> Update Status
                </Button>
            </div>
        </div>
    );
};

export default JobDetails;


