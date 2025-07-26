'use client';
import React, { useRef, useState } from 'react';
import { Eye, Download, Phone, Mail, FilePlus, Edit, ArrowLeftCircle, RefreshCw, NotebookText, Hourglass, MessageCircle, MessageSquare, FolderUp, User, UserPen, Building, Hash, Package2, IdCard, CalendarCheck, Settings, Calendar, Clock, Link, Upload, Wrench, Check, X, ArrowLeft, FileText, CheckCircle, ListChecks, Headset, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

const JobDetails = ({ jobData, onBack, onUpload, onEdit, onUpdateStatus }) => {
    const steps = [
        {
            label: 'Request Submitted',
            date: 'Jan 10',
            icon: <CheckCircle className="text-green-500" size={20} />,
        },
        {
            label: 'Assigned to CFS Team',
            date: 'Jan 11',
            icon: <CheckCircle className="text-green-500" size={20} />,
        },
        {
            label: 'In Progress',
            date: 'Jan 12',
            icon: <Hourglass className="text-yellow-500" size={20} />,
        },
        {
            label: 'Completed',
            date: '(Pending)',
            icon: <Clock className="text-gray-400" size={20} />,
        },
    ];

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
        documents: initialDocuments,
        consigneeName,
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

    const [formData, setFormData] = useState({
        status: '',
        remarks: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const [documents, setDocuments] = useState(initialDocuments || []);

    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this document?");
        if (confirmDelete) {
            const updatedDocs = documents.filter((_, i) => i !== index);
            setDocuments(updatedDocs);
        }
    };

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newDoc = {
                name: file.name,
                url: URL.createObjectURL(file)
            };
            setDocuments(prev => [...prev, newDoc]);

            if (onUpload) onUpload(file);

            e.target.value = null;
        }
    };


    return (
        <div className="space-y-6">
            <div>
                <h1 className="flex gap-2 text-2xl text-black font-bold mb-4"><NotebookText size={25} className='mr-2 mt-1 text-foreground' />Job Order Details : JOB-{jobId}</h1>
            </div>
            {/* Order Info */}
            <div className="bg-white shadow-lg text-black rounded-xl p-6">
                <div className='border-b-4 border-secondary/50'>
                    <h1 className="flex text-2xl font-semibold mb-4"><FileText size={25} className='mr-2 mt-1 text-foreground' /> Order Information</h1>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-4 px-4 mt-6">
                    <div className='space-y-4'>
                        <div><p className='font-light'>Order No: </p><span className='font-medium'>{orderNumber}</span></div>
                        <div><p className='font-light'>From Date: </p><span className='font-medium'>{fromDate}</span></div>
                    </div>
                    <div className='space-y-4'>
                        <div><p className='font-light'>Service Type: </p><span className='font-medium'>{service}</span></div>
                        <div><p className='font-light'>To Date: </p><span className='font-medium'>{toDate}</span></div>
                    </div>
                    <div className='space-y-4'>
                        <div><p className='font-light'>Status: </p><span className='font-medium'>{status}</span></div>
                        <div><p className='font-light'>Request Date: </p><span className='font-medium'>{toDate}</span></div>
                    </div>
                </div>
            </div>

            {/* Request Info */}
            <div className="space-y-4 shadow-xs rounded-md bg-white p-6">
                <div className="text-black">
                    <div className='border-b-4 border-secondary/50'>
                        <h1 className="flex gap-2 text-2xl font-semibold mb-4"><Package2 size={25} className="mt-1 text-white fill-foreground" />Request Information</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 px-4 mt-6">
                        <div className='space-y-4'>
                            <div><p className='font-light'>Requested By: </p><span className='font-medium'>{customerName}</span></div>
                            <div><p className='font-light'>Contact Email: </p><span className='font-medium'>{assignedPersonnel.email}</span></div>
                        </div>
                        <div className='space-y-4'>
                            <div><p className='font-light'>Company: </p><span className='font-medium'>{consigneeName}</span></div>
                            <div><p className='font-light'>Phone: </p><span className='font-medium'>{assignedPersonnel.contact}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white shadow-lg rounded-xl text-black p-6 sm:p-6">
                <h2 className="flex text-xl sm:text-xl font-semibold mb-3"><FolderUp size={25} className='mr-2 text-foreground' />Uploaded Documents</h2>
                {documents.length === 0 ? (
                    <p className="text-sm text-gray-800">No documents uploaded.</p>
                ) : (
                    <div className="space-y-4">
                        {documents.map((doc, i) => (
                            <div key={i} className="flex justify-between items-center bg-accent p-2 rounded-md shadow border-0">
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
                                    {/* <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(i)}
                                        className="text-sm text-white px-3 py-1 flex items-center gap-1"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </Button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* <input
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className='flex justify-end mt-4'>
                    <Button onClick={handleUploadClick} className="text-white flex items-center gap-2">
                        <FilePlus size={16} /> Upload File
                    </Button>
                </div> */}
            </div>

            {/* CFS Response */}
            <div className="bg-white shadow rounded-xl text-black p-6">
                <div className='border-b-4 border-secondary/50'>
                    <h3 className="text-lg font-semibold flex text-black items-center gap-2 mb-3">
                        <Wrench className="w-5 h-5 text-foreground" /> CFS Response
                    </h3>
                </div>
                <div className='grid grid-cols-2 gap-4 p-4'>
                    <div><p className='font-light'>Remarks from CFS: </p><span className='font-medium'>{remarks}</span></div>
                    <div><p className='font-light'>Last Updated On: </p><span className='font-medium'>{updatedOn}</span></div>
                </div>
            </div>

            {/* Job Progress Timeline */}
            <div className="bg-white shadow rounded-xl text-black p-6 mt-4">
                <div className="border-b-4 border-secondary/50">
                    <h2 className="flex gap-2 text-lg font-semibold mb-3"><ListChecks size={20} className='text-foreground mt-1' /> Job Progress Timeline</h2>
                </div>
                <div className="space-y-6 p-4 mt-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="mt-1">{step.icon}</div>
                            <div>
                                <p className={`font-medium ${step.label === 'Completed' ? 'text-gray-500' : ''}`}>
                                    {step.label}
                                </p>
                                <p className="text-sm text-gray-500">{step.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 border-t-4 border-secondary/50 pt-4">
                    <h3 className="flex gap-2 text-md font-semibold mb-3"><Headset size={20} className='text-foreground mt-1' /> Support / Action</h3>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                        <MessageCircle size={18} />
                        Message Support
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap">
                <Button variant="outline" className="flex items-center gap-2 border-foreground text-foreground hover:bg-foreground hover:text-white">
                    <a href="/customer/cfs/services/job-order" className="flex gap-2 items-center text-sm"><ArrowLeftCircle size={16} /> Back</a>
                </Button>
            </div>


        </div>
    );
};

export default JobDetails;


