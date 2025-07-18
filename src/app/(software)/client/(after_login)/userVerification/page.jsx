'use client';
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import UserVerificationDesktop from "./components/desktopView";
import TableList from "./components/Table";




export default function UserVerification() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle('User Verification Page')
    }, []);

    return (
        <section>
            <UserVerificationDesktop />

            
            {/* {
                useIsMobile()?(
                    // <UserVerificationMobile />
                ) : (
                    // <UserVerificationDesktop />
                    // <RequestList />
                    <TableList />
                )
            } */}
        </section>
    )
}















// 'use client';
// import { useIsMobile } from "@/hooks/use-mobile";
// import { useSidebar } from "@/contexts/SidebarProvider";
// import { useEffect, useState } from "react";
// import MobileTable from "./components/mobileTable";
// import Table from "./components/Table";

// export default function UserVerification() {
//   const { setTitle } = useSidebar();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTitle("User Verification Page");

//     const fetchUsers = async () => {
//       try {
//         const res = await fetch('/api/users');
//         const data = await res.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <section>
//       {useIsMobile() ? (
//         <MobileTable users={users} loading={loading} />
//       ) : (
//         <Table users={users} loading={loading} />
//       )}
//     </section>
//   );
// }
