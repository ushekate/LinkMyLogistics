'use client';
import { useEffect, useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import TableList from './Table';

export default function UserVerificationDesktop() {
  const [userType, setUserType] = useState('CFS');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAllUsers([
        { firstName: 'Blue', lastName: 'Star CFS', role: 'CFS', status: 'Pending', createdAt: '2024-06-01' },
        { firstName: 'John', lastName: 'Doe', role: 'CFS', status: 'Approved', createdAt: '2024-06-01' },
        { firstName: 'Vishal', lastName: 'Its', role: 'Customer', status: 'Approved', createdAt: '2024-06-04' },
        { firstName: 'Green', lastName: 'Logs CFS', role: 'CFS', status: 'Rejected', createdAt: '2024-05-25' },
        { firstName: 'Fname', lastName: 'Customer', role: 'Customer', status: 'Pending', createdAt: '2024-06-07' },
        { firstName: 'FirstName', lastName: 'Star CFS', role: 'CFS', status: 'Approved', createdAt: '2024-06-02' },
        { firstName: 'Green', lastName: 'Star', role: 'Customer', status: 'Rejected', createdAt: '2024-05-29' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = allUsers.filter((user) => {
    const matchesRole = user.role === userType;
    const matchesSearch = user.firstName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === '' || user.status === status;

    const userDate = new Date(user.createdAt);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDate =
      (!from || userDate >= from) &&
      (!to || userDate <= to);

    return matchesRole && matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-4 sm:p-6 bg-[var(--background)] min-h-screen text-green-950">
      <div className="bg-accent shadow-lg p-4 rounded-md mb-6 border-0">

        <div className='flex flex-wrap gap-2 mb-4'>
          <Tabs>
            <Input
              type="button"
              value="CFS"
              onClick={() => setUserType('CFS')}
              className={`border-0 cursor-pointer px-4 py-2 rounded-md ${
                userType === 'CFS' ? 'bg-primary text-white' : 'bg-white'
              }`}
            />
          </Tabs>
          <Tabs>
            <Input
              type="button"
              value="Customer"
              onClick={() => setUserType('Customer')}
              className={`border-0 cursor-pointer px-4 py-2 rounded-md ${
                userType === 'Customer' ? 'bg-primary text-white' : 'bg-white'
              }`}
            />
          </Tabs>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Search Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-md border"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 rounded-md border"
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 rounded-md border"
          />
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 rounded-md border"
          />
        </div>
      </div>


      <div className="overflow-x-auto">
        <TableList users={filteredUsers} userType={userType} loading={loading} />
      </div>
    </div>
  );
}
