'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect, useRef, useState } from "react";
import JobDetails from "./components/Table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
    const { setTitle } = useSidebar();
    const router = useRouter();
    const fileInputRef = useRef(null);

    useEffect(() => {
        setTitle('Job Order View Details');
    }, []);

    const [showStatusModal, setShowStatusModal] = useState(false);

    const [job, setJob] = useState({
        jobId: "1234",
        orderNumber: "ORD5678",
        customerName: "John Doe",
        service: "Transport",
        status: "Completed",
        fromDate: "2025-06-01",
        toDate: "2025-06-10",
        createdOn: "2025-06-01",
        updatedOn: "2025-06-09",
        remarks: "All operations completed successfully.",
        documents: [
            { name: "invoice.pdf", url: "/dummy.pdf" },
            { name: "report.pdf", url: "/dummy.pdf" }
        ],
        assignedPersonnel: {
            assignedBy: "Manager A",
            contact: "1234567890",
            email: "manager@example.com"
        }
    });


    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files.length) return;

        const newDocs = Array.from(files).map(file => ({
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        setJob(prev => ({
            ...prev,
            documents: [...prev.documents, ...newDocs]
        }));
    };


    const handleStatusChange = (newStatus) => {
        setJob(prev => ({
            ...prev,
            status: newStatus,
            updatedOn: new Date().toISOString().split("T")[0]
        }));
        setShowStatusModal(false);
    };

    return (
        <div className="p-4">
            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <JobDetails
                jobData={job}
                onBack={() => router.push('/client/cfs/services/job-order/view')}
                onUpload={() => fileInputRef.current?.click()}
                onEdit={() => router.push(`/client/cfs/services/job-order/edit`)}
                onUpdateStatus={() => setShowStatusModal(true)}
            />

            {showStatusModal && (
                <div className="fixed inset-0 bg-black/5 backdrop-blur flex justify-center items-center z-50">
                    <div className="bg-accent p-6 rounded-lg shadow-lg w-[20%]">
                        <h2 className="text-lg font-bold mb-4">Update Status</h2>
                        <div className="space-y-2">
                            {['Pending', 'Completed', 'Cancelled'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    className="block w-full text-left px-4 py-2 bg-background hover:bg-primary hover:text-white rounded"
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        <Button
                            onClick={() => setShowStatusModal(false)}
                            className="mt-4 text-sm text-white hover:underline"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;


