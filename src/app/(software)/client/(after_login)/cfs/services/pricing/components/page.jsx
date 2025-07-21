'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    FileText, User, Mail, MapPin, CalendarDays,
    ClipboardList, Boxes, BadgeCheck, StickyNote,
    Upload, Download, Eye, Edit3, MessageSquare,
    Building,
    CircleUser,
    Tags,
    BadgeIndianRupee,
    PackageOpen,
    File,
    FileImage,
    Scan,
    Wrench,
    ArrowLeftRight,
    Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ViewPricingRequest() {
    const { requestId } = useParams();

    const [requestData, setRequestData] = useState(null);

    useEffect(() => {
        const mockData = {
            requestId: requestId,
            customer: {
                company: 'ABC Exports Pvt. Ltd.',
                person: 'Rajesh Kumar',
                email: 'rajesh@abcexports.com',
                location: 'Nhava Sheva, Maharashtra',
            },
            request: {
                provider: 'Mumbai CFS Terminal',
                rate: '₹10,000',
                dpd: 'DPD',
                type: 'General',
                containers: 100,
                status: 'Accepted',
                date: '01 July 2025',
                notes: '-',
            },
            documents: [
                { name: 'Invoice.pdf', type: 'pdf', icon: FileText, color: 'text-red-600' },
                { name: 'ContainerImage1.jpg', type: 'jpg', icon: FileImage, color: 'text-blue-600' },
                { name: 'GatePass.png', type: 'png', icon: FileImage, color: 'text-green-600' },
            ],
        };
        setRequestData(mockData);
    }, [requestId]);

    if (!requestData) return <div className="p-6">Loading...</div>;

    const { customer, request, documents } = requestData;

    return (
        <div className="p-4 space-y-6 min-h-screen">
            <div className="py-2 border-b-4 border-secondary/50">
                <h1 className="flex gap-2 font-semibold text-2xl text-black">
                    <FileText size={24} className='mt-1' /> View Pricing Request - #{requestId}
                </h1>
            </div>

            {/* Customer Profile & Request Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Customer Profile */}
                <div className="bg-white shadow rounded-xl p-5 text-black space-y-2">
                    <h3 className="text-lg font-semibold text-black flex items-center gap-2 pb-2">
                        <User className="w-5 h-5 text-foreground fill-foreground" /> Customer Profile
                    </h3>
                    <div className='flex gap-4 items-center'>
                        <Building size={50} className='text-foreground bg-foreground/20 p-2 rounded-full' />
                        <p className="font-semibold text-lg text-black border-b-4 border-foreground/60">{customer.company}</p>
                    </div>
                    <p className="text-sm flex items-center gap-1"><CircleUser size={18} /><span className="font-medium">Contact Person:</span> {customer.person}</p>
                    <p className="text-sm flex items-center gap-1 text-foreground"><Mail size={18} className="w-4 h-4 text-black" /><span className='font-medium text-black'>Email:</span> {customer.email}</p>
                    <p className="text-sm flex items-center gap-1"><MapPin size={18} className="w-4 h-4" /><span className='font-medium'>Location:</span> {customer.location}</p>
                </div>

                {/* Request Details */}
                <div className="bg-white col-span-2 shadow text-black rounded-xl p-5 space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 pb-2">
                        <ClipboardList className="w-5 h-5 text-blue-600" /> Request Details
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <p className='flex items-center gap-1 mb-2'><Building size={18} className="text-secondary" /><strong>Service Provider:</strong> {request.provider}</p>
                            <p className='flex items-center gap-1 mb-2'><Tags size={18} className="text-secondary" /><strong>DPD / Non-DPD:</strong> {request.dpd}</p>
                            <p className='flex items-center gap-1 mb-2'><Boxes size={18} className="text-secondary" /><strong>Containers per Month:</strong> {request.containers}</p>
                            <p className="flex items-center gap-1 mb-2"><CalendarDays size={18} className="text-secondary" /><strong>Request Date:</strong>{request.date}</p>
                        </div>
                        <div>
                            <p className='flex items-center gap-1 mb-2'><BadgeIndianRupee size={18} className="text-secondary" /><strong>Preferable Rate:</strong> {request.rate}</p>
                            <p className='flex items-center gap-1 mb-2'><PackageOpen size={18} className="text-secondary" /><strong>Container Type:</strong> {request.type}</p>
                            <p className="flex items-center gap-1 mb-2"><BadgeCheck size={18} className="text-green-600" /><strong>Status:</strong><span className="text-green-600">{request.status}</span></p>
                            <p className='flex items-center gap-1 mb-2'><File size={18} className="text-secondary" /><strong>Additional Notes:</strong> {request.notes}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white shadow rounded-xl text-black p-5">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-blue-600" /> Documents
                </h3>
                <div className="flex flex-wrap gap-3 mb-4">
                    {documents.map((doc, index) => (
                        <div key={index} className="border border-secondary/50 rounded-lg px-4 py-2 bg-white flex items-center gap-2">
                            <span className="flex gap-1 font-medium">
                                <doc.icon size={18} className={`${doc.color} mt-1`} />
                                {doc.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                    <Button className="bg-secondary/30 p-2 rounded-md flex items-center gap-2"><Upload className="w-4 h-4" /> Upload ZIP</Button>
                    <Button className="bg-secondary/30 p-2 rounded-md flex items-center gap-2"><Download className="w-4 h-4" /> Download All</Button>
                    <Button className="bg-secondary/30 p-2 rounded-md flex items-center gap-2"><Scan className="w-4 h-4" /> View Fullscreen</Button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white shadow rounded-xl p-5">
                <h3 className="text-lg font-semibold flex text-black items-center gap-2 mb-3">
                    <Wrench className="w-5 h-5 text-blue-600" /> CFS Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button className="h-15 bg-blue-100 text-blue-600 flex items-center justify-center py-4 rounded-md gap-2 hover:text-white hover:bg-blue-600"><Edit3 className="w-4 h-4" /> Edit Request</Button>
                    <Button className="h-15 bg-purple-100 text-purple-600 flex items-center justify-center py-4 rounded-md gap-2 hover:text-white hover:bg-purple-600"><StickyNote className="w-4 h-4" /> Add Note</Button>
                    <Button className="h-15 bg-green-100 text-green-600 flex items-center justify-center py-4 rounded-md gap-2 hover:text-white hover:bg-green-600"><ArrowLeftRight className="w-4 h-4" /> Change Status: Accepted</Button>
                    <Button className="h-15 bg-yellow-100 text-yellow-600 flex items-center justify-center py-4 rounded-md gap-2 hover:text-white hover:bg-yellow-600"><Send className="w-4 h-4" /> Send Message to Customer</Button>
                </div>
            </div>

            <div>
                <Link href={`/client/cfs/services/pricing/components/${requestId}`}>
                    <Button className="text-white p-2 w-full rounded-md flex items-center gap-2"><Eye className="w-4 h-4" />View Details</Button>
                </Link>
            </div>

        </div>
    );
}

