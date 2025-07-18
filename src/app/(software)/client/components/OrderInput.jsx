import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { orders } from "@/constants/orders";
import { Check } from "lucide-react";
import { useState } from "react";

export default function OrderInput({ setOrderId }) {
	const [formData, setFormData] = useState({
		orderId: '',
		orderInfo: '',
	});
	const [showOrders, setShowOrders] = useState(false);

	const handleChange = (e) => {
		const { value } = e.target;
		setFormData((prev) => ({
			...prev,
			orderInfo: value,
			orderId: '',
		}));
		setShowOrders(value.trim() !== '');
	};

	const handleSelectOrder = ({ info }) => {
		setFormData({
			orderInfo: `${info.id} - ${info.cfs.title}`,
			orderId: info.id,
		});
		setOrderId(info.id);
		setShowOrders(false);
	};

	return (
		<div className="flex flex-col gap-2 relative">
			<Label title="Order ID" />
			<Input
				type="text"
				name="orderInfo"
				value={formData.orderInfo}
				onChange={handleChange}
				placeholder="Enter an Order Id"
				autoComplete="off"
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
								className="flex items-center justify-between p-2 hover:bg-accent cursor-pointer"
								onClick={() => handleSelectOrder({ info: order })}
							>
								<h1>{order.id} - {order.cfs.title}</h1>
								{formData.orderId === order.id && (
									<Check className="h-4 w-4 text-primary" />
								)}
							</div>
						))}
				</div>
			)}
		</div>
	)
}
