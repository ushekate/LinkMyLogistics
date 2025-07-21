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
    CheckCircle,
    CalendarDaysIcon,
    Pin,
    LucideAlignLeft,
    Link2Icon,
    NotebookPen,
    Paperclip,
    ChartLine,
    Megaphone,
    User,
    Lightbulb,
    Eye,
    Mail,
    MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/contexts/SidebarProvider';

export default function NotificationDetailPage() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle('Notification & Updates');
    }, []);

    const params = useParams();
    const notificationId = params?.id;
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotification = async () => {
            if (!notificationId) {
                setLoading(false);
                return;
            }
            try {
                const record = await pbclient.collection('notification_unnati').getOne(notificationId);
                setNotification(record);
            } catch (err) {
                console.log('Failed to fetch notification:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotification();
    }, [notificationId]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (!notification) return <div className="p-4">Notification not found.</div>;

    const {
        title,
        description,
        type,
        date,
        sender,
        sentOn,
        attachment,
        link1,
        link2,
        link3,
    } = notification;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedSentOn = new Date(sentOn || notification.created).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const attachments = Array.isArray(attachment) ? attachment : [attachment];

    return (
        <div className="max-w-full mx-auto px-4 py-4">
            <div className="bg-primary text-white p-4 rounded-t-xl flex gap-3">
                <div>
                    <Megaphone size={50} className="bg-blue-400 rounded-full p-2" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">{title}</h1>
                </div>
            </div>

            <div className="bg-white shadow rounded-b-xl p-4">
                <section className="mb-6">
                    <h2 className="flex items-center gap-2 font-semibold text-lg ml-4">
                        <Pin size={18} /> Notification Overview
                    </h2>
                    <div className="grid grid-cols-1 gap-4 max-w-full p-4 text-black">
                        <div className="flex justify-between border border-secondary/50 bg-secondary/10 rounded-md p-3">
                            <p><span className="text-secondary font-light text-sm mx-2">Type:</span> {type || 'Feature Update'}</p>
                            <p><span className="text-secondary font-light text-sm mx-2">Date Posted:</span> {formattedDate}</p>
                            <p className="flex items-center gap-2"><span className="text-secondary font-light text-sm mx-2">Status:</span><CheckCircle size={16} className="text-green-600" /> Read</p>
                            <p className="flex items-center gap-2"><User size={16} className="ml-2" /><span>Sent By: {sender || 'GOL Admin'}</span></p>
                        </div>
                    </div>

                </section>

                <section className="mb-6">
                    <h2 className="flex gap-2 font-semibold text-lg mb-2 ml-4">
                        <LucideAlignLeft size={20} className="mt-1" /> Description
                    </h2>
                    <div className="px-4">
                        <div className="border border-secondary/50 text-sm text-secondary bg-secondary/10 rounded-md p-4">
                            <p>{description}</p>
                            <div className='mt-8 p-4 border rounded-md border-secondary/50'>
                                <h2 className="flex items-center gap-2 font-semibold text-lg"><Lightbulb size={18} />Key Benefits</h2>
                                <ul className="list-disc ml-8 text-sm text-secondary">
                                    <li>Real Time Cargo Milestone Tracking</li>
                                    <li>Live Interactive map Visualization</li>
                                    <li>Automatic delay alerts and notifications</li>
                                    <li>Enhanced dashboard controls</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Links Section */}
                <section className="mb-6">
                    <h2 className="flex gap-2 font-semibold text-lg mb-2 ml-4">
                        <Link2Icon size={20} className="mt-1" /> Useful Links
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-secondary/50 bg-secondary/10 rounded-md p-4 mx-4">
                        {link1 && <a href={link1} target="_blank" className="p-4 border rounded-md bg-white text-center hover:shadow">Launch Live Map Dashboard</a>}
                        {link2 && <a href={link2} target="_blank" className="p-4 border rounded-md bg-white text-center hover:shadow">User Guide PDF</a>}
                        {link3 && <a href={link3} target="_blank" className="p-4 border rounded-md bg-white text-center hover:shadow">Watch Quick Demo</a>}
                    </div>
                </section>

                {attachments?.length > 0 && (
                    <section className="mb-6">
                        <h2 className="flex gap-2 font-semibold text-lg mb-2 ml-4">
                            <Paperclip size={18} className="mt-1.5" /> Attachments
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 border border-secondary/50 bg-secondary/10 rounded-md p-4 mx-4">
                            {attachments.map((file, idx) => {
                                const fileExt = file?.split('.').pop().toLowerCase();
                                const icon =
                                    fileExt === 'pdf' ? <FileText className="text-blue-600" /> :
                                        ['jpg', 'jpeg', 'png'].includes(fileExt) ? <ImageIcon className="text-blue-600" /> :
                                            ['mp4', 'mov'].includes(fileExt) ? <Video className="text-blue-600" /> :
                                                <FileText className="text-blue-600" />;

                                const baseUrl = `http://127.0.0.1:8090/api/files/notification_unnati/${notification.id}/${file}`;

                                return (
                                    <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-md border text-sm">
                                        <div className="flex gap-2 items-center truncate">
                                            {icon}
                                            <span className="truncate max-w-[140px]">{file}</span>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            {/* View Button */}
                                            <a
                                                href={baseUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-xs"
                                            >
                                                <Eye size={18} className='cursor-pointer mt-1' />
                                            </a>
                                            {/* Download Button */}
                                            <a
                                                href={baseUrl}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Download className="w-4 h-4 cursor-pointer" />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Chats */}
                <div className='ml-4 mb-6'>
                    <div className='flex gap-2 mb-2'>
                        <MessageSquare size={20} className='mt-1' />
                        <h1 className='font-semibold text-lg'>Have Questions</h1>
                    </div>
                    <Button className='text-white'>
                        <Mail size={18} />
                        Chat GOL Support
                    </Button>
                </div>

                {/* Back Link */}
                <Link href="/client/notifications" className="text-foreground flex items-center gap-2 hover:underline mx-4">
                    <ArrowLeft className="w-4 h-4" /> Back to All Notifications
                </Link>
            </div>
        </div>
    );
}
