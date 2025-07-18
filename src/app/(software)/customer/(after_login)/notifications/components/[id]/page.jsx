'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  Megaphone
} from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function ViewDetailsPage() {
  const { setTitle } = useSidebar();
  const params = useSearchParams();

  useEffect(() => {
    setTitle('View More Details');
  }, []);

  const title = params.get('title') || 'Seminar Invite: Export Trends 2025';
  const type = params.get('type') || 'Event';
  const date = params.get('date') || 'July 15, 2025';
  const time = params.get('time') || '4:00 PM – 6:00 PM';
  const mode = params.get('mode') || 'Zoom & In-Person at Green Ocean HQ';
  const sender = params.get('sender') || 'Green Ocean Logistics Admin';
  const sentOn = params.get('sentOn') || 'July 10, 2025 – 2:30 PM';

  return (
    <div className="max-w-full mx-auto px-4 py-4">
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-t-xl flex gap-3">
        <div><Megaphone size={50} className="bg-blue-400 rounded-full p-2" /></div>
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex items-center gap-2 text-sm">
            <CalendarDaysIcon className="w-5 h-5" />
            <span>{date} • {time} • {mode}</span>
          </div>
        </div>
      </div>

      {/* Notification Overview */}
      <div className="bg-white shadow rounded-b-xl p-4">
        <section className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-lg ml-4">
            <Pin className="text-foreground fill-foreground" size={18} /> Notification Overview
          </h2>
          <div className="grid grid-cols-1 gap-4 max-w-full p-4 text-black">
            <div className="border border-secondary/50 bg-secondary/10 rounded-md p-3">
              <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Title:</span> {title}</p>
              <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Type:</span> {type}</p>
              <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Date:</span> {date}</p>
              <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Time:</span> {time}</p>
              <p className="p-1"><span className="text-secondary font-light text-sm mx-2">Mode:</span> {mode}</p>
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
              <p className="mb-2">
                Join us for a special seminar focused on the future of shipping logistics, international compliance, and digital transformation in container freight.
              </p>
              <p>
                Guest speakers include global supply chain experts and port officials.
              </p>
            </div>
          </div>
        </section>

        {/* Action Items */}
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
              <Button className="bg-white text-foreground px-4 py-2 rounded-md border border-foreground hover:bg-foreground hover:text-white flex items-center gap-2">
                <Download className="w-4 h-4" /> Download Agenda (PDF)
              </Button>
            </div>
          </div>
        </section>

        {/* Attachments */}
        <section className="mb-6">
          <h2 className="flex gap-2 font-semibold text-lg mb-2 ml-4">
            <Paperclip size={18} className="mt-1.5" /> Attachments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border border-secondary/50 bg-secondary/10 rounded-md mx-4 p-4">
            <div className="bg-white border rounded-md p-3 flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-foreground" />
                <span>Agenda_Seminar2025.pdf</span>
              </div>
              <Download className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="bg-gray-50 border rounded-md p-3 flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-foreground" />
                <span>InvitePoster.jpg</span>
              </div>
              <Download className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="bg-gray-50 border rounded-md p-3 flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-foreground" />
                <span>TeaserVideo.mp4</span>
              </div>
              <Download className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
        </section>

        {/* Metadata */}
        <section className="mb-6">
          <h2 className="flex gap-2 font-semibold text-lg mb-2 ml-4">
            <ChartLine size={18} className="mt-1" /> Notification Metadata
          </h2>
          <div className="grid grid-cols-1 gap-4 text-sm border border-secondary/50 rounded-md p-4 mx-4 text-black bg-secondary/10">
            <p><span className="text-secondary font-light text-sm mx-2">Sent By:</span> {sender}</p>
            <p><span className="text-secondary font-light text-sm mx-2">Sent On:</span> {sentOn}</p>
            <p className="flex items-center gap-1 mx-2 text-black">
              <span className="text-secondary font-light text-sm">Status:</span>
              <CheckCircle size={18} className="w-4 h-4 ml-2 text-green-600" /> Read
            </p>
          </div>
        </section>

        {/* Back Button */}
        <Link href="/customer/notifications" className="text-foreground flex items-center gap-2 hover:underline mx-4">
          <ArrowLeft className="w-4 h-4" /> Back to All Notifications
        </Link>
      </div>
    </div>
  );
}