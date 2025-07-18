import { useState } from "react";
import { FileText, Upload, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { orders } from "@/constants/orders";
import TextArea from "@/components/ui/TextArea";
import { cfsServices } from "@/constants/services";
import { Select, SelectItem } from "@/components/ui/Select";

export default function NewRequests() {
	const [formData, setFormData] = useState({
		orderId: '',
		orderInfo: '',
		remarks: '',
		serviceType: '',
		file: null,
	});
	const [showOrders, setShowOrders] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleChange = (e) => {
		const { value } = e.target;
		setFormData((prev) => ({
			...prev,
			orderInfo: value,
			orderId: '', // optional: clear previous selection
		}));
		setShowOrders(value.trim() !== '');
	};

	const handleSelectOrder = ({ info }) => {
		setFormData({
			orderInfo: `${info.id} - ${info.cfs.title}`,
			orderId: info.id,
		});
		setShowOrders(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsOpen(false);
		console.log('Form submitted:', formData);
	};

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setFormData({
				...formData,
				file: e.target.files[0]
			});
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
			trigger={<Button title="New Request" icon={<FileText />} className="rounded-lg" textSize="text-sm" />}
			title="New Request"
			className='w-[200px] bg-[var(--accent)]'
		>
			<div className="grid gap-4 min-w-[40dvw]">
				<div className="flex flex-col gap-2 relative">
					<Label title="Order ID" />
					<Input
						type="text"
						name="orderInfo"
						value={formData.orderInfo}
						onChange={handleChange}
						placeholder="Enter an Order Id"
						autoComplete="off"
						className="bg-[var(--accent)]"
					/>

					{showOrders && (
						<div className="absolute top-[7dvh] z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
							{orders
								.filter(order =>
									(`${order.id} - ${order.cfs.title}`)
										.toLowerCase()
										.includes(formData.orderInfo.toLowerCase())
								)
								.map(order => (
									<div
										key={order.id}
										className="flex items-center justify-between p-2 hover:bg-[var(--accent)] cursor-pointer"
										onClick={() => handleSelectOrder({ info: order })}
									>
										<h1>{order.id} - {order.cfs.title}</h1>
										{formData.orderId === order.id && (
											<Check className="h-4 w-4 text-[var(--primary)]" />
										)}
									</div>
								))}
						</div>
					)}
				</div>

				<div className="flex flex-col gap-2 relative">
					<Label title="Remarks" />
					<TextArea
						name="remarks"
						value={formData.remarks}
						onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
						placeholder="Enter Remarks (optional)"
						className="bg-[var(--accent)]"
					/>
				</div>

				<div className="flex flex-col gap-2 relative">
					<Label title="Remarks" />
					<Select
						placeholder="Service Type"
						value={formData.serviceType}
						onValueChange={(value) => {
							setFormData({ ...formData, serviceType: value })
						}}
					>
						{cfsServices.map((service, index) => (
							<SelectItem key={index} value={service.id}>{service.title}</SelectItem>
						))}
					</Select>
				</div>

				<div className="flex flex-col gap-2">
					<Label title="Upload Documents" />
					<div className="flex items-center gap-2">
						<label className="flex items-center cursor-pointer border rounded-xl px-4 py-2 bg-[var(--accent)]">
							<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
							</svg>
							<span className="text-sm">Choose File</span>
							<input
								type="file"
								className="hidden"
								onChange={handleFileChange}
								accept=".pdf,.jpg,.png"
							/>
						</label>
						<span className="text-sm text-gray-500">
							{formData.file ? formData.file.name : 'No file chosen'}
						</span>
					</div>
					<p className="text-xs text-gray-500">
						Supported file types: PDF, JPG, PNG (max size: 5MB)
					</p>
				</div>

				<div className="mt-6">
					<Button onClick={handleSubmit} title="Request" icon={<Upload />} iconPosition="right" className="rounded-xl" />
				</div>
			</div>
		</Dialog>
	);
}
