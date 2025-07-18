'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays, Megaphone, Receipt, MapPin, Star, CheckCircle,
  MessageCircleQuestion, FileText, RefreshCw, Clock, SquarePen,
  LucideMegaphone, Dot, CircleCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotificationsPage() {
  const [expanded, setExpanded] = useState(false);

  const notifications = [
    // Data
    {
      id: 0,
      type: 'event',
      icon: <CalendarDays size={30} className="text-blue-600 bg-blue-100 p-1.5 rounded-full" />,
      icon2: <LucideMegaphone size={18} className="text-blue-600" />,
      title: 'Seminar Invitation – "Export Trends 2025"',
      time: '2:30 PM',
      location: 'Green Ocean HQ / Zoom',
      description:
        'You are invited to attend our upcoming seminar on international shipping compliance. Learn about digital transformation in CFS and warehouse logistics.',
      actions: [
        { label: 'View More Details', variant: 'secondary' },
        { label: 'Fill RSVP Form', variant: 'primary' },
      ],
      date: '10 July 2025',
    },
    {
      id: 1,
      type: 'announcement',
      icon: <Star size={30} className="text-yellow-600 bg-yellow-100 p-1.5 rounded-full" />,
      icon2: <Dot size={15} className="text-yellow-600 bg-yellow-600 rounded-full" />,
      title: 'New Feature Alert – Track & Trace 2.0',
      description:
        'You can now view container milestones on a live map with real-time delay alerts.',
      actions: [{ label: 'View More Details', variant: 'secondary' }],
      date: '7 July 2025',
    },
    {
      id: 2,
      type: 'invoice',
      icon: <CheckCircle size={30} className="text-green-500 bg-green-100 p-1.5 rounded-full" />,
      icon2: <CircleCheck size={18} className="text-green-600" />,
      title: 'Tax Invoice Download Reminder',
      description:
        'Your tax invoice for June 2025 is ready to download from the dashboard.',
      actions: [{ label: 'View More Details', variant: 'secondary' }],
      date: '6 July 2025',
    },
    // more dummy data
    {
      id: 3,
      type: 'event',
      icon: <CalendarDays size={30} className="text-purple-600 bg-purple-100 p-1.5 rounded-full" />,
      icon2: <Megaphone size={18} className="text-purple-600" />,
      title: 'Webinar – Logistics AI Integration',
      time: '11:00 AM',
      location: 'Online Zoom Link',
      description: 'Join us for a webinar discussing AI in warehouse automation.',
      actions: [
        { label: 'View More Details', variant: 'secondary' },
        { label: 'Fill RSVP Form', variant: 'primary' },
      ],
      date: '4 July 2025',
    },
    {
      id: 4,
      type: 'announcement',
      icon: <Star size={30} className="text-pink-600 bg-pink-100 p-1.5 rounded-full" />,
      icon2: <Dot size={15} className="text-pink-600 bg-pink-600 rounded-full" />,
      title: 'New Language Support – Hindi Interface',
      description: 'EduLearn is now available in Hindi for improved accessibility.',
      actions: [{ label: 'View More Details', variant: 'secondary' }],
      date: '2 July 2025',
    },
    {
      id: 5,
      type: 'invoice',
      icon: <CheckCircle size={30} className="text-red-500 bg-red-100 p-1.5 rounded-full" />,
      icon2: <CircleCheck size={18} className="text-red-600" />,
      title: 'Overdue Payment Notice',
      description: 'You have a pending invoice from May 2025. Please make payment.',
      actions: [{ label: 'View More Details', variant: 'secondary' }],
      date: '28 June 2025',
    },
  ];

  const visibleNotifications = expanded ? notifications : notifications.slice(0, 3);

  return (
    <div className="max-w-full mx-auto px-4 py-6">
      {visibleNotifications.map((note, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-200 rounded-md p-4 mb-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-1">{note.icon}</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  {note.icon2}
                  {note.title}
                </h3>
                <div className="grid grid-cols-2">
                  {note.time && (
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {note.time}
                    </div>
                  )}
                  {note.location && (
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {note.location}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-2">{note.description}</p>

                <div className="flex gap-2 mt-3">
                  {note.actions.map((action, i) =>
                    action.label === 'View More Details' ? (
                      <Link
                        key={i}
                        href={`/customer/notifications/components/${note.id}`}
                      >
                        <Button className="flex gap-2 text-sm px-3 py-1.5 rounded-md font-medium bg-gray-100 text-gray-800">
                          <FileText size={18} />
                          {action.label}
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        key={i}
                        className="flex gap-2 text-sm px-3 py-1.5 rounded-md font-medium bg-blue-600 text-white"
                      >
                        <SquarePen size={18} />
                        {action.label}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {note.date}
            </span>
          </div>
        </div>
      ))}

      {/* Toggle Button */}
      <div className="text-center mt-6">
        <Button
          onClick={() => setExpanded(!expanded)}
          className="border bg-white border-primary text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 hover:text-white transition"
        >
          <span className="flex items-center gap-2">
            <RefreshCw size={18} />
            {expanded ? 'Show Less' : 'Load More Notifications'}
          </span>
        </Button>
      </div>
    </div>
  );
}

