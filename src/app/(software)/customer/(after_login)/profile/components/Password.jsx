import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input"
import Label from "@/components/ui/Label"
import { useState } from "react";

export default function Password() {

	const [userInfo, setUserInfo] = useState({
		newPassword: '',
		confirmPassword: '',
	});

	return (
		<div className="border bg-[var(--accent)] shadow-md shadow-foreground/40 p-4 rounded-xl grid gap-4">
			<h1 className="text-xl font-semibold pb-6">Change Password</h1>
			<div className="w-full flex md:flex-row flex-col gap-4 items-center justify-between">
				<div className="w-full flex flex-col gap-2">
					<Label title={'New Password'} />
					<Input type='text' value={userInfo.newPassword} onChange={(e) => setUserInfo({ ...userInfo, newPassword: e.target.value })} className='h-12' placeholder='********' />
				</div>
				<div className="w-full flex flex-col gap-2">
					<Label title={'Confirm Password'} />
					<Input type='text' value={userInfo.confirmPassword} onChange={(e) => setUserInfo({ ...userInfo, currentPassword: e.target.value })} className='h-12' placeholder='********' />
				</div>
			</div>

			<div className="w-full">
				<Button title={'Save Changes'} className="rounded-lg w-full" />
			</div>
		</div>
	)
}

