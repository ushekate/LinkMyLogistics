import Button from "@/components/ui/Button";
import { MapPin, Search, SlidersHorizontalIcon } from "lucide-react";
import { cfsRequestsLists, filterValues } from "@/constants/requestsList";
import Filter from "./Filter";
import { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";

export default function DesktopCFS() {
	const [filteredRequests, setFilteredRequests] = useState(cfsRequestsLists);
	const [requestsFilter, setRequestsFilter] = useState(cfsRequestsLists);
	const [isOpen, setIsOpen] = useState(false);
	const [SearchText, setSearchText] = useState('');

	const StatusColor = ({ status }) => {
		switch (status) {
			case 'approved':
				return 'bg-green-100 border border-green-800 text-green-800'
			case 'gol-approved':
				return 'bg-blue-100 border border-blue-800 text-blue-800'
			case 'rejected':
				return 'bg-red-100 border border-red-800 text-red-800'
			default:
				return 'bg-yellow-100 border border-yellow-600 text-yellow-600'
		}
	}

	const handleSearchChange = (e) => {
		const value = e.target.value;
		if (value === '') {
			setFilteredRequests(requestsFilter);
		} else {
			setFilteredRequests(filteredRequests.filter((request) => {
				// Check if the CustomerName or Contact matches the search query
				const matchesQuery =
					request.provider.title.toLowerCase().includes(value.toLowerCase()) ||
					request.provider.location.toLowerCase().includes(value.toLowerCase());
				// Combine both conditions
				return matchesQuery;
			}));
		}
		setSearchText(value);
	};

	return (
		<section className="w-full min-h-screen">
			<div id="search-bar" className="py-[5dvh] flex items-center justify-center gap-4 w-full">
				<div className="flex items-center w-[60%] shadow-md shadow-foreground/40 rounded-xl">
					<input type='text' placeholder='Search CFS by name or location' value={SearchText} onChange={handleSearchChange}
						className='h-auto flex w-full rounded-md border-y border-l border-input bg-[var(--accent)] px-3 py-[11px] text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--foreground)] placeholder:text-[var(--secondary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ' />
					<Button title={'Search'} icon={<Search />} className="rounded-r-xl -ml-2 " />
				</div>
				<Dialog
					trigger={<Button title={'Filter'} icon={<SlidersHorizontalIcon />} iconPosition="right" className="rounded-xl" />}
					title="Filters"
					open={isOpen}
					onOpenChange={setIsOpen}
				>
					<Filter setFilteredRequests={setFilteredRequests} setInitialData={setRequestsFilter} isOpen={isOpen} setIsOpen={setIsOpen} />
				</Dialog>
			</div>
			<div id="requests-container" className="grid gap-4">
				{filteredRequests.map((request, index) => (
					<div key={index} id="requests-card" className="border rounded-xl p-4 bg-[var(--accent)] shadow-md shadow-foreground/40">
						<div className="flex justify-between">
							<div className="flex flex-col gap-2">
								<h1 className="font-bold text-lg">{request.provider.title}</h1>
								<div className="flex items-center text-gray-600 text-sm">
									<MapPin className="mr-1 w-4 h-4" />
									<span className="">{request.provider.location}</span>
								</div>
								<p>Date: {request.date}</p>
							</div>
							<div>
								<span className={`px-4 py-2 rounded-xl w-[140px] text-sm text-center font-bold
									${StatusColor({ status: request.status })}
									`}
								>
									{filterValues.status.find((status) => status.id === request.status).label}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

