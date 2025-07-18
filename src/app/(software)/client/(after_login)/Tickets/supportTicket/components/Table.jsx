'use client';

import { Pencil, PencilLine, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import pbclient from "@/lib/db";


// const initialTickets = [
//     {
//         id: 1,
//         customerName: 'ABC Logistics',
//         location: 'Mundra',
//         issueTitle: 'Delay in Upload',
//         type: 'Delay',
//         status: 'Pending',
//         date: '2025-06-12',
//     },
//     {
//         id: 2,
//         customerName: 'XYZ Shipping',
//         location: 'Nava Sheva',
//         issueTitle: 'Damage Report',
//         type: 'Damage',
//         status: 'Resolved',
//         date: '2025-06-11',
//     },
//     {
//         id: 3,
//         customerName: 'MoveFast co.',
//         location: 'Chennai',
//         issueTitle: 'Container Query',
//         type: 'Query',
//         status: 'Closed',
//         date: '2025-06-10',
//     },
// ];

const statusColorMap = {
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    resolved: 'bg-green-100 text-green-800 border border-green-300',
    closed: 'bg-gray-200 text-gray-800 border border-gray-300',
};



export default function TicketPage() {
    const [activeTab, setActiveTab] = useState('customer');
    const [tickets, setTickets] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const records = await pbclient.collection('tickets').getFullList({
                    sort: '-created',
                });
                setTickets(records);
            }catch (error) {
                console.error("Error fetching tickets : ",error);
            }
        };
        fetchTickets();
    }, []);

    const handleDelete = async (id) => {
        // const updatedTickets = tickets.filter(ticket => ticket.id !== id);
        // setTickets(updatedTickets);
        try {
            await pbclient.collection('tickets').delete(id);
            setTickets(prev => prev.filter(ticket => ticket.id !== id));
        }catch (error) {
            console.error("Faild to delete ticket : ",error);
        }
    };

    const handleEdit = (id) => {
        router.push(`/client/Tickets/supportTicket/editTicket?id=${id}`);
    }

    return (
        <div className="p-4 bg-accent rounded shadow-lg text-sm">

            {/* Tabs */}
            <div className="flex w-fit p-2 rounded mb-4">
                    <Tabs>
                        <TabsList className="bg-background">
                            <TabsTrigger value="customer" onClick={() => setActiveTab('customer')} className={`px-4 py-2 rounded font-semibold ${activeTab === 'customer' ? 'bg-[#2E6F40] text-white' : 'bg-background border-0 text-[#333336] font-semibold'}`}>
                                Customer Tickets
                            </TabsTrigger>
                            <TabsTrigger value="client" onClick={() => setActiveTab('client')} className={`px-4 py-2 rounded font-semibold ${activeTab === 'client' ? 'bg-[#2E6F40] text-white' : 'bg-background border-0 text-[#333336] font-semibold'}`}>
                                Client Tickets
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
            </div>


            {/* For Desktop Device */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border border-green-700 rounded-md overflow-hidden">
                    <thead className="bg-[#d7eadc] text-left border-b border-green-700">
                        <tr className="text-[#71717A]">
                            <th className="p-3">No</th>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">CFS Location</th>
                            <th className="p-3">Issue Title</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tickets.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center text-gray-500 py-4">
                                    No tickets found.
                                </td>
                            </tr>
                        ) : (
                            tickets.map((ticket, index) => (
                                <tr key={ticket.id} className="border-b text-black border-green-700 hover:bg-green-50 transition">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 font-semibold">{ticket.customerName}</td>
                                    <td className="p-3">{ticket.location}</td>
                                    <td className="p-3">{ticket.issueTitle}</td>
                                    <td className="p-3">{ticket.type}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColorMap[ticket.status.toLowerCase()]}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{ticket.date || '-'}</td>
                                    <td className="p-3 flex gap-4 items-center">
                                        <Button className="text-green-700 hover:text-green-900 bg-accent" onClick={() => handleEdit(ticket.id)}>
                                            <Pencil size={16} />
                                        </Button>
                                        <Button className="text-red-700 hover:text-red-900 bg-accent" onClick={() => handleDelete(ticket.id)}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>


            {/* For Mobile Device */}
            <div className="block md:hidden space-y-4">
                {tickets.length === 0 ? (
                    <div>
                        <p className="text-center text-gray-500 py-4">
                            No tickets found.
                        </p>
                    </div>
                ) : (
                    tickets.map((ticket, index) => (
                        <div key={ticket.id} className="border border-green-700 rounded-lg p-4 bg-background shadow-sm">
                            <div className="flex justify-between mb-2 text-sm text-gray-600">
                                <span className="font-bold text-black">#{index + 1}</span>
                                <span>{ticket.date || '-'}</span>
                            </div>
                            <div className="mb-1 flex gap-2">
                                <strong className="block text-green-800">Customer:</strong>
                                <span className="text-black">{ticket.customerName}</span>
                            </div>
                            <div className="mb-1 flex gap-2">
                                <strong className="block text-green-800">Location:</strong>
                                <span className="text-black">{ticket.location}</span>
                            </div>
                            <div className="mb-1 flex gap-2">
                                <strong className="block text-green-800">Issue:</strong>
                                <span className="text-black">{ticket.issueTitle}</span>
                            </div>
                            <div className="mb-1 flex gap-2">
                                <strong className="block text-green-800">Type:</strong>
                                <span className="text-black">{ticket.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <strong className="block text-green-800">Status:</strong>
                                    <span className={`inline-block px-2 py-1 h-7 text-xs font-medium rounded-full ${statusColorMap[ticket.status.toLowerCase()]}`}>
                                        {ticket.status}
                                    </span>
                                </div>
                                <div className="flex justify-end gap-4">
                                    <Button
                                        className="text-green-700 hover:text-green-900 bg-background"
                                        onClick={() => handleEdit(ticket.id)}
                                    >
                                        <Pencil size={16} />
                                    </Button>
                                    <Button
                                        className="text-red-700 hover:text-red-900 bg-background"
                                        onClick={() => handleDelete(ticket.id)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}