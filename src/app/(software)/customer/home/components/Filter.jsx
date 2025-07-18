'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import {
	Select,
	SelectItem,
} from '@/components/ui/Select';
import RangeSlider from '@/components/ui/Range';
import { fetchCFSData } from '@/lib/api';

// Ranges
const minTariffValues = { min: 5000, max: 10000 };
const maxTariffValues = { min: 10000, max: 15000 };

const minMonthlyDues = { min: 0, max: 10000 };
const maxMonthlyDues = { min: 10000, max: 20000 };

const minContainers = { min: 1, max: 20 };
const maxContainers = { min: 20, max: 50 };

export function FilterCFS({ onSubmit }) {
	const [placeType, setPlaceType] = useState('Tariff Rates');
	const [tariffPriceRange, setTariffPriceRange] = useState({ min: minTariffValues.min, max: minTariffValues.max });
	const [freeDays, setFreeDays] = useState('7');
	const [monthlyDues, setMonthlyDues] = useState({ min: minMonthlyDues.min, max: minMonthlyDues.max });
	const [containers, setContainers] = useState({ min: minContainers.min, max: maxContainers.max });

	const handleInputChange = (e, type, setter, rangeMin, rangeMax) => {
		let value = parseInt(e.target.value) || 0;
		value = Math.max(rangeMin, Math.min(rangeMax, value));
		setter((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const handleClearAll = () => {
		setPlaceType('Tariff Rates');
		setFreeDays('7');
		setTariffPriceRange({ min: minTariffValues.min, max: minTariffValues.max });
		setMonthlyDues({ min: minMonthlyDues.min, max: minMonthlyDues.max });
		setContainers({ min: minContainers.min, max: maxContainers.max });
	};

	const handleShowProviders = async () => {
		const filters = {
			placeType,
			tariffPriceRange,
			freeDays,
			monthlyDues,
			containers,
		};
		const data = await fetchCFSData(filters);
		console.log('Filtered CFS Data:', data);
		onSubmit(data);
	};

	return (
		<div className="md:p-6">
			{/* Type Buttons */}
			<div className="mb-6">
				<div className="grid md:grid-cols-4 grid-cols-2 gap-4">
					{['Tariff Rates', 'Free Days', 'Monthly Dues', 'Containers'].map((type) => (
						<button
							key={type}
							onClick={() => setPlaceType(type)}
							className={`px-4 py-2 rounded-full border-2 cursor-pointer ${
								placeType === type ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : ''
							}`}
						>
							{type}
						</button>
					))}
				</div>
			</div>

			{/* Tariff */}
			{placeType === 'Tariff Rates' && (
				<div className="mb-6">
					<h3 className="text-sm font-medium mb-3">Price range</h3>
					<div className="flex gap-4">
						<RangeSlider value={tariffPriceRange.min} onChange={(e) => handleInputChange(e, 'min', setTariffPriceRange, minTariffValues.min, minTariffValues.max)} min={minTariffValues.min} max={minTariffValues.max} />
						<RangeSlider value={tariffPriceRange.max} onChange={(e) => handleInputChange(e, 'max', setTariffPriceRange, maxTariffValues.min, maxTariffValues.max)} min={maxTariffValues.min} max={maxTariffValues.max} />
					</div>
					<div className="flex justify-between mt-3">
						<div>
							<label className="text-sm text-gray-600">Minimum (₹)</label>
							<Input type="number" value={tariffPriceRange.min} onChange={(e) => handleInputChange(e, 'min', setTariffPriceRange, minTariffValues.min, minTariffValues.max)} />
						</div>
						<div>
							<label className="text-sm text-gray-600">Maximum (₹)</label>
							<Input type="number" value={tariffPriceRange.max} onChange={(e) => handleInputChange(e, 'max', setTariffPriceRange, maxTariffValues.min, maxTariffValues.max)} />
						</div>
					</div>
				</div>
			)}

			{/* Free Days */}
			{placeType === 'Free Days' && (
				<div className="mb-6">
					<label className="text-sm">Max No. of Free Days</label>
					<Select value={freeDays} onValueChange={setFreeDays}>
						<SelectItem value="7">7 Days</SelectItem>
						<SelectItem value="15">15 Days</SelectItem>
						<SelectItem value="30">A Month</SelectItem>
					</Select>
				</div>
			)}

			{/* Monthly Dues */}
			{placeType === 'Monthly Dues' && (
				<div className="mb-6">
					<h3 className="text-sm font-medium mb-3">Monthly Due Range</h3>
					<div className="flex gap-4">
						<RangeSlider value={monthlyDues.min} onChange={(e) => handleInputChange(e, 'min', setMonthlyDues, minMonthlyDues.min, minMonthlyDues.max)} min={minMonthlyDues.min} max={minMonthlyDues.max} />
						<RangeSlider value={monthlyDues.max} onChange={(e) => handleInputChange(e, 'max', setMonthlyDues, maxMonthlyDues.min, maxMonthlyDues.max)} min={maxMonthlyDues.min} max={maxMonthlyDues.max} />
					</div>
					<div className="flex justify-between mt-3">
						<div>
							<label className="text-sm text-gray-600">Minimum (₹)</label>
							<Input type="number" value={monthlyDues.min} onChange={(e) => handleInputChange(e, 'min', setMonthlyDues, minMonthlyDues.min, minMonthlyDues.max)} />
						</div>
						<div>
							<label className="text-sm text-gray-600">Maximum (₹)</label>
							<Input type="number" value={monthlyDues.max} onChange={(e) => handleInputChange(e, 'max', setMonthlyDues, maxMonthlyDues.min, maxMonthlyDues.max)} />
						</div>
					</div>
				</div>
			)}

			{/* Containers */}
			{placeType === 'Containers' && (
				<div className="mb-6">
					<h3 className="text-sm font-medium mb-3">Container Range</h3>
					<div className="flex gap-4">
						<RangeSlider value={containers.min} onChange={(e) => handleInputChange(e, 'min', setContainers, minContainers.min, minContainers.max)} min={minContainers.min} max={minContainers.max} />
						<RangeSlider value={containers.max} onChange={(e) => handleInputChange(e, 'max', setContainers, maxContainers.min, maxContainers.max)} min={maxContainers.min} max={maxContainers.max} />
					</div>
					<div className="flex justify-between mt-3">
						<div>
							<label className="text-sm text-gray-600">Minimum</label>
							<Input type="number" value={containers.min} onChange={(e) => handleInputChange(e, 'min', setContainers, minContainers.min, minContainers.max)} />
						</div>
						<div>
							<label className="text-sm text-gray-600">Maximum</label>
							<Input type="number" value={containers.max} onChange={(e) => handleInputChange(e, 'max', setContainers, maxContainers.min, maxContainers.max)} />
						</div>
					</div>
				</div>
			)}

			{/* Action Buttons */}
			<div className="flex items-center justify-between mt-10">
				<Button
					onClick={handleClearAll}
					variant="outline"
					className="rounded-xl text-green-900"
				>
					Clear All
				</Button>
				<Button
					onClick={handleShowProviders}
					className="rounded-xl"
				>
					Show Providers
				</Button>
			</div>
		</div>
	);
}


