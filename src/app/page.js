'use client';

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/Dialog";
import { ArrowUpRight, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-4 w-full h-screen items-center justify-center">
      <Button
        iconposition="right"
        className="rounded-xl"
        variant={'outline'}
        onClick={() => router.push('/customer/login')}
      ><ArrowUpRight/> Customer Side</Button>

      <Button
        iconposition="right"
        className="rounded-xl"
        variant={'outline'}
        onClick={() => router.push('/client/dashboard')}
      ><ArrowUpRight/> Client Side</Button>

      <Button
        iconposition="right"
        className="rounded-xl"
        onClick={() => toast.info("Success :)")}
      ><Bell/> Show Notification</Button>

      <Dialog
        trigger={<button className="px-4 py-2 bg-blue-500 text-white rounded">Open Dialog</button>}
        title="Welcome"
        description="This is a custom dialog component."
      >
        <p>Put any content here, like forms or text.</p>
        <button
          onClick={() => console.log('Action')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </Dialog>
    </main>
  );
}
