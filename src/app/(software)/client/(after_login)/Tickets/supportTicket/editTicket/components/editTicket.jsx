'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import { useRef } from 'react';
import { Select, SelectItem } from '@/components/ui/Select';
import Label from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';

export default function EditTicket({ ticketData }) {
    const router = useRouter();
    const fileInpuRef = useRef(null);

    const [formData, setFormData] = useState({
        customerName: ticketData?.customerName || '',
        location: ticketData?.location || '',
        issueTitle: ticketData?.issueTitle || '',
        type: ticketData?.type || '',
        status: ticketData?.status || '',
        description: ticketData?.description || '',
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInpuRef.current) {
            fileInpuRef.current.value = null;
        }
    };

    const handleCancel = () => {
        router.push('/client/Tickets');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting data:', formData, file);
    };

    return (
        <div className="p-10 bg-accent rounded shadow-lg w-full mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 text-[#09090B]">
                    <div>
                        <Label htmlFor="customerName" title="Customer/Client Name" className="mb-1 font-semibold block text-[#09090B]">Customer/Client Name</Label>
                        <Input
                            name="customerName"
                            type="text"
                            className="border rounded w-full p-2 bg-background"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="ABC Logistics"
                        />
                    </div>
                    <div>
                        <Label htmlFor="location" title="CFS Location" className="mb-1 block">CFS Location</Label>
                        <div className="relative w-full">
                            <Select value={formData.location} className='bg-background' placeholder='Select Location'>
                                <SelectItem value="" disabled={true}>Select Location</SelectItem>
                                <SelectItem value="Nava Sheva">Nava Sheva</SelectItem>
                                <SelectItem value="Mundra">Mundra</SelectItem>
                                <SelectItem value="Chennai">Chennai</SelectItem>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="issueTitle" title="Issue Title" className="mb-1 block">Issue Title</Label>
                        <Input
                            name="issueTitle"
                            type="text"
                            className="border rounded w-full p-2 bg-background"
                            value={formData.issueTitle}
                            onChange={handleChange}
                            placeholder="Delay Unload"
                        />
                    </div>
                    <div>
                        <Label htmlFor="type" title="Type" className="mb-1 block">Type</Label>
                        <div className="relative w-full">
                            <Select value={formData.type} className='bg-background' placeholder='Select Type'>
                                <SelectItem value="" disabled={true}>Select Type</SelectItem>
                                <SelectItem value="Delay">Delay</SelectItem>
                                <SelectItem value="Damage">Damage</SelectItem>
                                <SelectItem value="Query">Query</SelectItem>
                            </Select>
                        </div>

                    </div>
                    <div>
                        <Label htmlFor="status" title="Status" className="mb-1 block">Status</Label>
                        <div className="relative w-full">
                            <Select value={formData.status} className='bg-background' placeholder='Select Status'>
                                <SelectItem value="" disabled={true}>Select Status</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                                <SelectItem value="Closed">Closed</SelectItem>
                            </Select>
                        </div>

                    </div>
                </div>

                <div className='text-[#09090B]'>
                    <Label htmlFor="description" title="Description" className="mb-1 block">Description</Label>
                    <TextArea
                        name="description"
                        className="border rounded w-full p-2 bg-background h-28 resize-none"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Uploaded Files Section */}
                <div className="grid gap-2 text-[#09090B]">
                    <Label htmlFor="fileUpload" title={'Uploaded File'} className="mb-1 block">Uploaded File</Label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border rounded p-2 bg-background">
                        <Input
                            ref={fileInpuRef}
                            id="fileUpload"
                            type="file"
                            onChange={handleFileUpload}
                            className="w-full border-0 sm:w-full text-sm text-gray-900 file:bg-green-900 file:text-white file:rounded file:border-0 file:px-4 file:mr-4 cursor-pointer"
                        />
                        {file && (
                            <Button
                                type="button"
                                className="flex items-center bg-red-700 hover:bg-red-500 text-white px-3 py-1"
                                onClick={handleRemoveFile}
                            >
                                <Trash2 size={16} className="mr-2" /> Remove
                            </Button>
                        )}
                    </div>
                </div>

                {/* Replace File Section */}
                {file && (
                    <div className="grid gap-2">
                        <Label className="mb-1 block">Replace File</Label>
                        <Button
                            type="button"
                            className="flex items-center text-white h-10"
                            onClick={() => fileInpuRef.current.click() }
                        >
                            <Upload size={16} className="mr-2" /> Upload New
                        </Button>
                    </div>
                )}

                <hr className="my-8 border-[#09090B]" />

                <div className="flex flex-col md:flex-row justify-end gap-4">
                    <Button
                        type="button"
                        className="bg-red-700 text-white hover:bg-red-500"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="text-white">
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
