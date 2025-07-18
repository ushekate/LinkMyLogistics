import Label from "@/components/ui/Label";
import { Box, CircleCheckBig } from "lucide-react";

export default function OrderDetails({ order }) {
	return (
		<div className="md:m-6 p-5 block items-center border-1 border-green-900 bg-[var(--accent)] shadow-md shadow-foreground/40 rounded-[6px]">
			<div className="flex items-center gap-2 text-2xl mb-2">
				<Box size={25} />
				<Label title={'Order Details'} />
			</div>
			<div className="grid text-black gap-4">
				<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
					<div>
						<p className="text-sm text-[#71717A]">Order ID :</p>
						<Label title={order.id} className="text-[var(--foreground)]" />
					</div>
					<div>
						<p className="text-sm text-[#71717A]">Pickup Location :</p>
						<Label title={order.pickUpLocation} className="text-[var(--foreground)]" />
					</div>
				</div>
				<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
					<div>
						<p className="text-sm text-[#71717A]">Container No. :</p>
						<Label title={order.containerNo} className="text-[var(--foreground)]" />
					</div>
					<div>
						<p className="text-sm text-[#71717A]">Delivery Location :</p>
						<Label title={order.deliveryLocation} className="text-[var(--foreground)]" />
					</div>
				</div>
				<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
					<div>
						<p className="text-sm text-[#71717A]">IGM Number :</p>
						<Label title={order.IGMNo} className="text-[var(--foreground)]" />
					</div>
					<div className="w-auto">
						<p className="text-sm text-[#71717A]">Current Movement Status :</p>
						<div className="max-w-[150px]">
							<div className="text-[#16A34A] text-sm flex items-center justify-center bg-green-200 p-1 rounded-2xl w-auto">
								<CircleCheckBig size={15} className="mr-2" />
								<Label title={order.containerMovement[order.containerMovement.length - 1].status} />
							</div>
						</div>
					</div>
				</div>
				<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
					<div>
						<p className="text-sm">CFS Facility :</p>
						<Label title={order.cfs.title} className="text-[var(--foreground)]" />
					</div>
					<div>
						<p className="text-sm text-[#71717A]">Last Updates :</p>
						<Label title={order.updatedAt} className="text-[var(--foreground)]" />
					</div>
				</div>
			</div>
		</div>
	)
}
