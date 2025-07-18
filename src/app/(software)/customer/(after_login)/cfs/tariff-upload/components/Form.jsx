import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Select, SelectItem } from "@/components/ui/Select";
import { orders } from "@/constants/orders";
import { Upload } from "lucide-react";

export default function Form() {
	return (
		<div className="border border-foreground shadow-md shadow-foreground/40 bg-[var(--accent)] p-4 rounded-xl">
			<h1 className="text-lg font-semibold">Upload New Tariff</h1>
			<form className="pt-4 flex flex-col gap-6">

				<div className="flex flex-col gap-2">
					<Label title={'Order ID'} />
					<Select className='w-full'>
						{
							orders.map((order) => (
								<SelectItem key={order.id}>{order.id} - {order.cfs.title}</SelectItem>
							))
						}
					</Select>
				</div>

				<div className="flex flex-col gap-2">
					<Label title={'Upload File'} />
					<div className="flex items-center justify-center w-full">
						<label
							className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-[var(--accent)]/70">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
								<p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
							</div>
							<input id="dropzone-file" type="file" className="hidden" />
						</label>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Label title={'Remarks (optional)'} />
					<Input type='text' placeholder='Add optional remarks...' />
				</div>

				<div>
					<Button title={'Upload'} icon={<Upload />} className="rounded-xl" />
				</div>

			</form>
		</div>
	)
}

