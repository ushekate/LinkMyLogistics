'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Select, SelectItem } from "@/components/ui/Select";
import { useSidebar } from "@/contexts/SidebarProvider";
import { ArrowLeft, ArrowLeftRight, Building, Calendar, CalendarCheck, Check, Clock, Download, Edit3, Eye, FileImage, FileText, Hash, IdCard, Link, Mail, MessageCircle, Package2, Scan, Send, Settings, StickyNote, Upload, User, Wrench, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PricingRequestDetailPage() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle('View Details');
    }, []);

    const { requestId } = useParams();
    const [requestData, setRequestData] = useState(null);
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

    useEffect(() => {
        const mockData = {
            requestId: requestId,
            documents: [
                { name: 'Invoice.pdf', type: 'pdf', icon: FileText, color: 'text-red-600' },
                { name: 'ContainerImage1.jpg', type: 'jpg', icon: FileImage, color: 'text-blue-600' },
                { name: 'GatePass.png', type: 'png', icon: FileImage, color: 'text-green-600' },
            ],
        };
        setRequestData(mockData);
    }, [requestId]);

    if (!requestData) return <div className="p-6">Loading...</div>;

    const { documents } = requestData;

    return (
        <div className="p-4 space-y-6 min-h-screen">
            <div className="py-2 border-b-4 border-secondary/50">
                <h1 className="flex gap-2 font-semibold text-2xl text-black">
                    <FileText size={24} className='mt-1' /> View Job Order -
                </h1>
            </div>

            {/* Customer Information */}
            <div className="space-y-4 shadow-xs rounded-md bg-white">
                <div className="p-4 text-black">
                    <h2 className="flex gap-2 text-lg font-semibold"><User size={20} className="mt-1 fill-foreground text-foreground" />Customer Information</h2>
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
                                            <p>Rajesh Kumar</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <Mail />
                                        <div>
                                            <p>Email: </p>
                                            <p className="text-foreground">rajesh@abcexports.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-4 items-center mb-4">
                                        <Hash />
                                        <div>
                                            <p>Order No: </p>
                                            <p>ORD-25990667075</p>
                                        </div>
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
                    <h1 className="flex gap-2 text-lg font-semibold"><Package2 size={20} className="mt-1 text-foreground" />Job Order Details</h1>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div>
                            <div className="flex gap-4 items-center mb-4">
                                <IdCard />
                                <div>
                                    <p>Job Id: </p>
                                    <p>JOB-11425031891</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <MessageCircle />
                                <div>
                                    <p>Remarks: </p>
                                    <p>Interchange for gate release</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <CalendarCheck />
                                <div>
                                    <p>Submitted On : </p>
                                    <p>Jan 10, 2024</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-4 items-center mb-4">
                                <Settings />
                                <div>
                                    <p>Service: </p>
                                    <p>EIR Copy</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <Calendar />
                                <div>
                                    <p>From Date: </p>
                                    <p>Jan 10, 2024</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-4 items-center mb-4">
                                <Clock />
                                <div>
                                    <p>Status: </p>
                                    <p>In Progress</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mb-4">
                                <Calendar />
                                <div>
                                    <p>To Date: </p>
                                    <p>Jan 20, 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attachments */}
            <div className="space-y-4 shadow-xs rounded-md bg-white">
                <div className="p-4 text-black">
                    <h1 className="flex gap-2 text-lg font-semibold"><Link size={20} className="mt-1 text-foreground" />Attached Documents</h1>
                    <div className="flex flex-wrap gap-3 my-4">
                        {documents.map((doc, index) => (
                            <div key={index} className="border border-secondary/50 cursor-pointer rounded-lg px-4 py-2 bg-white flex items-center gap-2">
                                <span className="flex gap-1 font-medium">
                                    <doc.icon size={18} className={`${doc.color} mt-1`} />
                                    {doc.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <Button className="bg-secondary/30 p-2 rounded-md flex items-center gap-2"><Upload className="w-4 h-4" /> Upload Docs</Button>
                        <Button className="bg-secondary/30 p-2 rounded-md flex items-center gap-2"><Eye className="w-4 h-4" /> View Docs </Button>
                        <Button className="bg-secondary/30 p-2 rounded-md flex items-center gap-2"><Download className="w-4 h-4" /> Download Zip </Button>
                    </div>
                </div>
            </div>

            {/* CFS Operator Tools */}
            <div className="bg-white shadow rounded-xl p-5">
                <h3 className="text-lg font-semibold flex text-black items-center gap-2 mb-3">
                    <Wrench className="w-5 h-5 text-foreground" /> CFS operator Tools
                </h3>
                <form action="" className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label title="Update Status" className="text-black mb-4 mt-4" />
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

                <div className="mt-4">
                    <a href="/client/cfs/services/pricing" className="flex items-center text-sm text-blue-600"><ArrowLeft />Back to Pricing Request</a>
                </div>

                {/* <Link href="/client/cfs/services/pricing" className="flex items-center text-sm text-blue-600 mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Pricing Requests
                </Link> */}
            </div>

        </div>
    );
}

