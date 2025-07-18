'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export default function TableList({ users = [], userType = '', loading = false }) {
  return (
    <div className="bg-accent shadow-lg p-4 rounded-md border-0">
      <h2 className="text-lg font-semibold mb-3">
        {userType === 'CFS' ? 'Container Freight Station (CFS)' : 'Customers'}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading users...</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-green-300">
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-b border-green-300">
                <td className="p-2 font-medium">{user.firstName}</td>
                <td className="p-2">{user.lastName}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-sm text-[#1E40AF] ${user.role === 'CFS' ? 'bg-[#DBEAFE]' : 'bg-[#DBEAFE]'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === 'Pending'
                      ? 'bg-[#FEF9C3] text-[#854D0E]'
                      : user.status === 'Approved'
                      ? 'bg-[#DCFCE7] text-[#166534]'
                      : 'bg-[#FEE2E2] text-[#991B1B]'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-2">
                  <Link href={'/client/userVerificationView'}>
                    <Button className="flex items-center gap-1 bg-[#2563EB2B] text-[#2563EB] px-3 py-1 rounded-full hover:bg-background">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}



















// import { CircleCheckBig, CircleX, Download, Eye, LayoutGrid, MessageSquare } from 'lucide-react';
// import { DataTable } from '@/components/ui/Table';
// import { orders } from '@/constants/orders';
// // import Button from '@/components/ui/Button';

// export default function RequestList() {
//   const columns = [
//     {
//       id: 'id',
//       accessorKey: 'id',
//       header: 'Order ID',
//       filterable: true,
//       cell: ({ row }) => <div>{row.original.id}</div>,
//     },
//     {
//       id: 'firstName',
//       accessorKey: 'firstName',
//       header: 'First Name',
//       filterable: true,
//       cell: ({ row }) => <div>{row.original.firstName}</div>,
//     },
//     {
//       id: 'lastName',
//       accessorKey: 'lastName',
//       header: 'Last Name',
//       filterable: true,
//       cell: ({ row }) => <div>{row.original.lastName}</div>,
//     },
//     {
//       id: 'role',
//       accessorKey: 'role',
//       header: 'Role',
//       filterable: true,
//       cell: ({ row }) => <div>{row.original.role}</div>,
//     },
//     {
//       id: 'status',
//       accessorKey: 'status',
//       header: 'Status',
//       filterable: true,
//       cell: ({ row }) => <div className={`${getStatusColor(row.original.status)} rounded-xl px-4 py-2 text-center`}>{row.original.status}</div>,
//     },
//     {
//       id: 'actions',
//       accessorKey: 'actions',
//       header: 'Actions',
//       filterable: false,
//       cell: ({ row }) => (
//         <div className='flex gap-2 items-center'>
//           <Eye />View
//         </div>
//       )
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Accepted':
//         return 'bg-green-100 text-green-800';
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Rejected':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="border rounded-lg p-6 mb-4">
//       <h2 className="text-xl font-semibold text-green-900 mb-4">Orders Page</h2>
//       <DataTable columns={columns} data={orders} />
//     </div>
//   )
// };
