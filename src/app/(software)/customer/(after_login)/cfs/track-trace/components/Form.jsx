import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { orders } from "@/constants/orders";
import { Truck } from "lucide-react";
import { useState } from "react";

export default function Form({ setOrder }) {
	const [formData, setFormData] = useState({
		igm: '',
		bl: '',
		boe: '',
		container: '',
	});


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleTrack = () => {

		const filtered = orders.find(order => {
			let matchesIGM = false, matchesBL = false, matchesBOE = false, matchesContainer = false;

			if (formData.igm !== '') {
				matchesIGM = order.IGMNo === formData.igm;
			}
			if (formData.bl !== '') {
				matchesBL = order.BLNo === formData.bl;
			}
			if (formData.boe !== '') {
				matchesBOE = order.BOENo === formData.boe;
			}
			if (formData.container !== '') {
				matchesContainer = order.containerNo === formData.container;
			}
			return matchesIGM || matchesBL || matchesBOE || matchesContainer;
		});
		if (filtered?.id) {
			setOrder(filtered);
		} else {
			setOrder({})
		}
	};

	return (
		<div className="md:m-6 block items-center border border-green-900 rounded-lg bg-[var(--accent)] shadow-md shadow-foreground/40">
			<div className="p-5">
				<h1 className="text-2xl font-semibold">Container Tracking</h1>
			</div>
			<div className="p-2 grid md:grid-cols-2 grid-cols-1 text-black">
				<div className="mx-3 my-2">
					<Label title={'IGM Number'} />
					<Input
						placeholder='Enter IGM Number'
						name="igm"
						value={formData.igm}
						onChange={handleChange}
					/>
				</div>
				<div className="mx-3 my-2">
					<Label title={'BL Number'} />
					<Input
						placeholder='Enter BL Number'
						name="bl"
						value={formData.bl}
						onChange={handleChange}
					/>
				</div>
				<div className="mx-3 my-2">
					<Label title={'BOE Number'} />
					<Input
						placeholder='Enter BOE Number'
						name="boe"
						value={formData.boe}
						onChange={handleChange}
					/>
				</div>
				<div className="mx-3 my-2">
					<Label title={'Container Number'} />
					<Input
						placeholder='Enter Container Number'
						name="container"
						value={formData.container}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="p-5 flex justify-end">
				<Button
					className="rounded-[6px]"
					icon={<Truck />}
					title={'Track Status'}
					onClick={handleTrack}
				/>
			</div>
		</div>
	)
}

