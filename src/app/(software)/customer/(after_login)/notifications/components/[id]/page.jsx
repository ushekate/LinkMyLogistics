'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import pbclient from '@/lib/db';
import Link from 'next/link';
import {
  CalendarDays, Download, FileText, Image as ImageIcon, Video, ArrowLeft,
  CheckCircle, CalendarDaysIcon, Pin, LucideAlignLeft, Link2Icon,
  NotebookPen, Paperclip, ChartLine, Megaphone
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
        console.log("Failed to fetch notification:", err);
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
    time,
    location,
    mode,
    sender,
    sentOn,
    attachment,
    start_time,
    end_time,
  } = notification;

  const formattedDate = new Date(date || notification.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const formattedTime =
    start_time && end_time
      ? `${new Date(start_time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })} - ${new Date(end_time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })}`
      : time
        ? new Date(time).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        : null;


  const formattedSentOn = new Date(sentOn || notification.created).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="max-w-full mx-auto px-4 py-4">
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-t-xl flex gap-3">
        <div><Megaphone size={50} className="bg-blue-400 rounded-full p-2" /></div>
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex items-center gap-2 text-sm">
            <CalendarDaysIcon className="w-5 h-5" />
            <span>{formattedDate}{time && ` • ${time}`}{mode && ` • ${mode}`}</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="bg-white shadow rounded-b-xl p-4">

        {/* Overview */}
        <section className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-lg ml-4">
            <Pin className="text-foreground fill-foreground" size={18} /> Notification Overview
          </h2>
          <div className="grid grid-cols-1 gap-4 max-w-full p-4 text-black">
            <div className="border border-secondary/50 bg-secondary/10 rounded-md p-3">
              <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Title:</span> {title}</p>
              <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Type:</span> {type || 'General'}</p>
              <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Date:</span> {formattedDate}</p>
              {formattedTime && <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Time:</span> {formattedTime}</p>}
              {mode && <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Mode:</span> {mode}</p>}
              {location && <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Location:</span> {location}</p>}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="mb-6">
          <h2 className="flex gap-2 font-semibold text-lg mb-2 ml-4">
            <LucideAlignLeft size={20} className="mt-1" /> Description
          </h2>
          <div className="px-4">
            <div className="border border-secondary/50 text-sm text-secondary bg-secondary/10 rounded-md p-4">
              <p>{description}</p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="mb-6">
          <h2 className="flex gap-2 font-semibold text-lg mb-2 pl-4">
            <Link2Icon size={25} className="mt-1" /> Action Items
          </h2>
          <div className="border border-secondary/50 bg-secondary/10 rounded-md mx-4 p-4">
            <div className="grid grid-cols-3 gap-3">
              <Button className="bg-foreground text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                <NotebookPen className="w-4 h-4" />
                Fill RSVP Form
              </Button>
              <Button className="bg-white text-foreground px-4 py-2 rounded-md border border-foreground hover:bg-foreground hover:text-white flex items-center gap-2">
                <CalendarDays className="w-4 h-4" /> Add to Calendar
              </Button>
              {attachment && (
                <a
                  href={`http://127.0.0.1:8090/api/files/notification_unnati/${notification.id}/${attachment}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-white text-foreground px-4 py-2 rounded-md border border-foreground hover:bg-foreground hover:text-white flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download Attachment
                  </Button>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Attachments */}

        {attachment && Array.isArray(attachment) && attachment.length > 0 && (
          <section className="mb-6">
            <h2 className="flex gap-2 font-semibold text-lg mb-2 ml-4">
              <Paperclip size={18} className="mt-1.5" /> Attachments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border border-secondary/50 bg-secondary/10 rounded-md mx-4 p-4">
              {attachment.map((file, index) => {
                const fileUrl = `http://127.0.0.1:8090/api/files/notification_unnati/${notification.id}/${file}`;
                const fileExt = file.split('.').pop().toLowerCase();
                const icon =
                  fileExt === 'pdf' ? <FileText className="text-blue-600" />
                    : ['jpg', 'jpeg', 'png'].includes(fileExt) ? <ImageIcon className="text-blue-600" />
                      : ['mp4', 'mov'].includes(fileExt) ? <Video className="text-blue-600" />
                        : <FileText className="text-blue-600" />;

                return (
                  <div key={index} className="bg-white border rounded-md p-3 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      {icon}
                      <span className="truncate max-w-[150px]">{file}</span>
                    </div>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 cursor-pointer text-gray-700" />
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Metadata */}
        <section className="mb-6">
          <h2 className="flex gap-2 font-semibold text-lg mb-2 ml-4">
            <ChartLine size={18} className="mt-1" /> Notification Metadata
          </h2>
          <div className="grid grid-cols-1 gap-4 text-sm border border-secondary/50 rounded-md p-4 mx-4 text-black bg-secondary/10">
            <p><span className="text-secondary font-light text-sm mx-2">Sent By:</span> {sender || 'System Admin'}</p>
            <p><span className="text-secondary font-light text-sm mx-2">Sent On:</span> {formattedSentOn}</p>
            <p className="flex items-center gap-1 mx-2 text-black">
              <span className="text-secondary font-light text-sm">Status:</span>
              <span className='font-light'>{notification?.status || "N/A"}</span>
            </p>
          </div>
        </section>

        {/* Back Link */}
        <Link href="/customer/notifications" className="text-foreground flex items-center gap-2 hover:underline mx-4">
          <ArrowLeft className="w-4 h-4" /> Back to All Notifications
        </Link>
      </div>
    </div>
  );
}

