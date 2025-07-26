'use client';
import React, { useState } from 'react';
import { Eye, Download, Phone, Mail, FilePlus, Edit, ArrowLeftCircle, RefreshCw, NotebookText, Hourglass, MessageCircle, MessageSquare, FolderUp, User, UserPen, Building, Hash, Package2, IdCard, CalendarCheck, Settings, Calendar, Clock, Link, Upload, Wrench, Check, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

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
    

    return (
        <div className="space-y-6">
            <div>
                <h1 className="flex gap-2 text-2xl text-black font-bold mb-4"><NotebookText size={25} className='mr-2 mt-1 text-foreground' />View Job Order : JOB-{jobId}</h1>
            </div>
            {/* Job Info */}
            <div className="bg-white shadow-lg text-black rounded-xl p-6">
                <h1 className="flex text-2xl font-semibold mb-6"><User size={25} className='mr-2 mt-1 text-foreground fill-foreground' /> Customer Information</h1>
                <div className="grid grid-cols-5 md:grid-cols-5 gap-4 mt-6">
                    <div className="flex bg-secondary/20 justify-center m-8 p-8 rounded-full"><Building size={80} className="text-secondary" /></div>
                    <div className="col-span-4">
                        <div className="border-b-2 border-secondary/50 pb-2">
                            <h1 className="text-lg font-semibold px-2">ABC Exports Pvt. Ltd.</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <div className="flex gap-4 items-center mb-4">
                                    <User />
                                    <div>
                                        <p>Contact Person: </p>
                                        <p>{customerName}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Mail />
                                    <div>
                                        <p>Email: </p>
                                        <p className="text-foreground">{assignedPersonnel.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-4 items-center mb-4">
                                    <Hash />
                                    <div>
                                        <p>Order No: </p>
                                        <p>{orderNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Order Details */}
            <div className="space-y-4 shadow-xs rounded-md bg-white">
                <div className="p-4 text-black">
                    <h1 className="flex gap-2 text-2xl font-semibold"><Package2 size={25} className="mt-1 text-white fill-foreground" />Job Order Details</h1>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div>
                            <div className="flex gap-4 items-center mb-4">
                                <IdCard />
                                <div>
                                    <p>Job Id: </p>
                                    <p>{jobId}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <MessageCircle />
                                <div>
                                    <p>Remarks: </p>
                                    <p>{remarks}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <CalendarCheck />
                                <div>
                                    <p>Submitted On : </p>
                                    <p>{createdOn}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-4 items-center mb-4">
                                <Settings />
                                <div>
                                    <p>Service: </p>
                                    <p>{service}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <Calendar />
                                <div>
                                    <p>From Date: </p>
                                    <p>{fromDate}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-4 items-center mb-4">
                                <Clock />
                                <div>
                                    <p>Status: </p>
                                    <p>{status}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <Calendar />
                                <div>
                                    <p>To Date: </p>
                                    <p>{toDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white shadow-lg rounded-xl p-6 sm:p-6">
                <h2 className="flex text-xl sm:text-xl font-semibold mb-3"><FolderUp size={25} className='mr-2' />Uploaded Documents</h2>
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* CFS Operator Tools */}
            <div className="bg-white shadow rounded-xl p-5">
                <h3 className="text-lg font-semibold flex text-black items-center gap-2 mb-3">
                    <Wrench className="w-5 h-5 text-foreground" /> CFS operator Tools
                </h3>
                <form action="" className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label title="Update Status" className="text-black my-4" />
                        <Select value={formData.status} onChange={handleInputChange} name="status" placeholder="Select Status" className="bg-white">
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">In Progress</SelectItem>
                            <SelectItem value="Cancelled">Rejected</SelectItem>
                        </Select>
                    </div>
                    <div>
                        <Label title="Add Remarks / Internal Note" className="text-black mb-4 mt-4" />
                        <Input
                            value={formData.remarks}
                            onChange={handleInputChange}
                            name="remarks"
                            placeholder="Add Remarks"
                        />
                    </div>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button className="flex text-white bg-green-700 hover:bg-green-600 items-center justify-center py-4 rounded-md gap-2"><Check className="w-4 h-4" /> Mark as Completed</Button>
                    <Button className="flex text-white bg-red-700 hover:bg-red-600 items-center justify-center py-4 rounded-md gap-2"><X className="w-4 h-4" /> Cancel Job Order</Button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-3 pt-4">
                <Button variant="outline" className="flex items-center gap-2 border-foreground text-foreground hover:bg-foreground hover:text-white">
                    <a href="/client/cfs/services/job-order" className="flex gap-2 items-center text-sm"><ArrowLeftCircle size={16} /> Back</a>
                </Button>
                <Button onClick={onUpload} className="text-white flex items-center gap-2">
                    <FilePlus size={16} /> Upload File
                </Button>
                {/* <Button onClick={onUpdateStatus} className="text-white flex items-center gap-2">
                    <RefreshCw size={16} /> Update Status
                </Button> */}
            </div>
        </div>
    );
};

export default JobDetails;


