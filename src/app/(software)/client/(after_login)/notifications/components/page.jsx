'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import pbclient from '@/lib/db';
import {
  CalendarDays, Megaphone, Receipt, MapPin, Star, CheckCircle,
  MessageCircleQuestion, FileText, RefreshCw, Clock, SquarePen,
  LucideMegaphone, Dot, CircleCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const getIconData = (type) => {
  switch (type) {
    case 'event':
      return {
        icon: <CalendarDays size={30} className="text-blue-600 bg-blue-100 p-1.5 rounded-full" />,
        icon2: <LucideMegaphone size={18} className="text-blue-600" />,
      };
    case 'announcement':
      return {
        icon: <Star size={30} className="text-yellow-600 bg-yellow-100 p-1.5 rounded-full" />,
        icon2: <Dot size={15} className="text-yellow-600 bg-yellow-600 rounded-full" />,
      };
    case 'invoice':
      return {
        icon: <CheckCircle size={30} className="text-green-500 bg-green-100 p-1.5 rounded-full" />,
        icon2: <CircleCheck size={18} className="text-green-600" />,
      };
    default:
      return {
        icon: <Megaphone size={30} className="text-gray-500 bg-gray-100 p-1.5 rounded-full" />,
        icon2: <MessageCircleQuestion size={18} className="text-gray-600" />,
      };
  }
};

export default function NotificationListPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await pbclient.collection('notification_unnati').getFullList({ sort: '-created' });
        setNotifications(result);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const visibleNotifications = expanded ? notifications : notifications.slice(0, 3);

  if (loading) return <div className="p-4">Loading notifications...</div>;

  return (
    <div className="max-w-full mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        visibleNotifications.map((note, idx) => {
          const { icon, icon2 } = getIconData(note.type);
          return (
            <div
              key={note.id}
              className="bg-white border border-gray-200 rounded-md p-4 mb-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      {icon2}
                      {note.title}
                    </h3>
                    <div className="grid grid-cols-2">
                      {note.time && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(note.time).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </div>
                      )}

                      {note.location && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {note.location}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      {note.description?.slice(0, 100)}...
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Link href={`/client/notifications/components/${note.id}`}>
                        <Button className="flex gap-2 text-sm px-3 py-1.5 rounded-md font-medium bg-gray-100 text-gray-800">
                          <FileText size={18} />
                          View More Details
                        </Button>
                      </Link>

                      {note.rsvp && (
                        <Button className="flex gap-2 text-sm px-3 py-1.5 rounded-md font-medium bg-blue-600 text-white">
                          <SquarePen size={18} />
                          Fill RSVP Form
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {new Date(note.date || note.created).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          );
        })
      )}

      {notifications.length > 3 && (
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
      )}
    </div>
  );
}



