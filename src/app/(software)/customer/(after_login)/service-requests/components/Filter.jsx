import Button from "@/components/ui/Button";
import { Select, SelectItem } from "@/components/ui/Select";
import { cfsRequestsLists, filterValues } from "@/constants/requestsList";
import { useEffect, useState } from "react"

export default function Filter({ setFilteredRequests, isOpen, setIsOpen, setInitialData }) {
	const [filter, setFilter] = useState({
		status: '',
		location: ''
	});
	const [filterOptions, setFilterOptions] = useState({
		status: [],
		location: [],
	});

	// Set Filter Values
	useEffect(() => {
		// status
		const locations = [];
		cfsRequestsLists.map((request) => locations.push(request.provider.location));
		let locationsSet = new Set(locations);
		let allLocations = [...locationsSet]
		setFilterOptions({ status: filterValues.status, location: allLocations });
	}, [cfsRequestsLists, filterValues]);


	const handleFilter = () => {
		if (filter.status !== '' && filter.location !== '') {
			const filtered_data = cfsRequestsLists.filter((request) => request.status === filter.status && request.provider.location === filter.location);
			setFilteredRequests(filtered_data);
			setInitialData(filtered_data);
		} else if (filter.status !== '' && filter.location === '') {
			const filtered_data = cfsRequestsLists.filter((request) => request.status === filter.status);
			setFilteredRequests(filtered_data);
			setInitialData(filtered_data);
		} else if (filter.status === '' && filter.location !== '') {
			const filtered_data = cfsRequestsLists.filter((request) => request.provider.location === filter.location);
			setFilteredRequests(filtered_data);
			setInitialData(filtered_data);
		} else {
			setFilteredRequests(cfsRequestsLists);
			setInitialData(cfsRequestsLists);
		}
		setIsOpen(false);
	}

	const handleClearAll = () => {
		setFilter({ status: '', location: '' });
		handleFilter();
		setIsOpen(false);
	};

	return (
		<>
			<div id="filter" className="flex flex-col items-center justify-center gap-6 w-2xl p-4">
				<Select
					value={filter.status}
					onValueChange={(value) => setFilter({ ...filter, status: value })}
					placeholder="Select Status"
					className='w-screen'
				>
					{filterOptions.status?.map((status, index) => (
						<SelectItem key={index} value={status.id}>{status.label}</SelectItem>
					))}
				</Select>
				<Select
					value={filter.location}
					onValueChange={(value) => setFilter({ ...filter, location: value })}
					placeholder="Select Location"
					className='w-full'
				>
					{filterOptions.location?.map((location, index) => (
						<SelectItem key={index} value={location}>{location}</SelectItem>
					))}
				</Select>
			</div>

			<div className="flex items-center justify-between gap-4 mt-10">
				<Button
					onClick={handleClearAll}
					title={'Clear all'}
					variant={'outline'}
					className='rounded-xl'
				/>

				<Button
					onClick={handleFilter}
					title={'Filter Values'}
					className='rounded-xl'
				/>
			</div>
		</>
	)
}

