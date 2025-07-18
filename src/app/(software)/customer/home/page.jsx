'use client';

import { useEffect, useState } from "react";
import HeaderLayout from "./components/HeaderLayout";
import MobileHeaderLayout from "./components/MobileHeaderLayout";
import { ServiceProviders, servicesList } from "@/constants/services";
import { Button } from "@/components/ui/Button";
import { SlidersHorizontalIcon, Star, MapPin, Search, NotepadText } from 'lucide-react';
import Image from "next/image";
import { Dialog } from "@/components/ui/Dialog";
import { FilterCFS } from "./components/Filter";
import { useIsMobile } from "@/hooks/use-mobile";
import LoginPopUp from "./components/LoginPopUp";

export default function ClientHomePage() {
	const [currentService, setCurrentService] = useState('cfs');
	const [serviceTitle, setServiceTitle] = useState('CFS');
	const [filteredServices, setFilteredServices] = useState(ServiceProviders.filter((provider) => provider.serviceId === currentService));
	const [SearchQuery, setSearchQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isPopup, setIsPopup] = useState(true);

	useEffect(() => {
		setServiceTitle(servicesList.find((s) => s.id === currentService)?.label || 'CFS');
		setFilteredServices(ServiceProviders.filter(
			(provider) =>
				provider.serviceId === currentService &&
				provider.title.toLowerCase().includes(SearchQuery.toLowerCase())
		));
	}, [currentService, SearchQuery]);

	const handlePopUpClose = () => setIsPopup(false);

	return (
		<section className="w-full h-auto">
			{useIsMobile() ? (
				<MobileHeaderLayout currentService={currentService} setCurrentService={setCurrentService} />
			) : (
				<HeaderLayout currentService={currentService} setCurrentService={setCurrentService} />
			)}

			<section className="p-8">
				{/* Top Search + Filter */}
				<div className="border rounded-md p-8 mx-2 md:mx-10 bg-accent">
					<div className="flex items-center gap-3 mb-6">
						<NotepadText />
						<h1 className="font-bold text-2xl">{serviceTitle} Service Providers</h1>
					</div>
					<div className="flex items-center gap-4">
						<div className="relative w-full">
							<Search className="absolute left-2 top-2 p-1 h-6 w-6 text-muted-foreground" />
							<input
								className="pl-10 h-11 w-full rounded-md border-0 bg-background text-foreground px-3 text-base shadow-sm placeholder:text-secondary focus-visible:ring-1 focus-visible:ring-primary"
								placeholder="Search CFS Service Providers..."
								value={SearchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<Dialog
							trigger={<Button icon={<SlidersHorizontalIcon size={20} />} className="bg-background text-black w-40 h-11">Filter</Button>}
							title="Filters"
							open={isOpen}
							onOpenChange={setIsOpen}
						>
							<FilterCFS openDialog={setIsOpen} />
						</Dialog>
					</div>
				</div>

				{/* Results List */}
				<div className="flex flex-col gap-6 pt-6">
					{filteredServices.map((provider) => (
						<ServiceCard key={provider.id} {...provider} />
					))}
				</div>

				{/* Popular Near You */}
				<div className="mx-2 md:mx-10 mt-8 p-4 bg-accent border rounded-md">
					<div className="flex items-center justify-between mb-2">
						<p className="text-base font-semibold text-foreground">
							Showing {filteredServices.length} of {ServiceProviders.length} CFS Providers
						</p>
						<Button variant="link" className="text-sm">View All →</Button>
					</div>
					<p className="text-sm mb-2">Popular Near You:</p>
					<div className="flex flex-wrap gap-2">
						{['CFS Thane', 'CFS Navi Mumbai', 'CFS Pune'].map((tag) => (
							<Button key={tag} variant="secondary" className="rounded-md text-sm bg-[var(--background)]">{tag}</Button>
						))}
					</div>
				</div>
			</section>

			{isPopup && <LoginPopUp onOpen={handlePopUpClose} />}
		</section>
	);
}

const ServiceCard = ({ title, location, rating, tags, description, images }) => {
	return (
		<div className="flex flex-col md:flex-row bg-accent border rounded-lg shadow-md mx-2 md:mx-10 p-4 gap-6">
			{/* Image Grid */}
			<div className="w-full md:w-2/5 bg-white rounded p-2">
				{/* Top Row (2 images) */}
				<div className="grid grid-cols-2 gap-2">
					{images.slice(0, 2).map((img, i) => (
						<div key={i} className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
							<Image
								src={img.src}
								alt={`${title}-${i}`}
								fill
								className="object-cover rounded-lg"
							/>
						</div>
					))}
				</div>

				{/* Bottom Row (3 images) */}
				<div className="grid grid-cols-3 gap-2 mt-2 relative">
					{images.slice(2, 5).map((img, i) => (
						<div key={i} className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
							<Image
								src={img.src}
								alt={`${title}-${i + 2}`}
								fill
								className="object-cover rounded-lg"
							/>
						</div>
					))}

					{/* Overlay (e.g. "+10") */}
					<div className="absolute right-2 bottom-2 bg-black text-white text-xs px-2 py-1 rounded-full z-10">
						+10
					</div>
				</div>
			</div>



			{/* Text & Actions */}
			<div className="flex-1 p-8">
				<h2 className="text-xl font-semibold">{title}</h2>
				<p className="flex items-center text-sm text-muted-foreground mt-1">
					<MapPin className="mr-1 w-4 h-4" /> {location}
				</p>

				<div className="flex gap-2 mt-2 flex-wrap">
					{tags.map((tag, i) => (
						<Button key={i} variant="secondary" className="rounded-lg text-xs bg-[var(--background)]">{tag}</Button>
					))}
				</div>

				<div className="flex items-center mt-4">
					{Array(5).fill(0).map((_, i) => (
						<Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
					))}
					<span className="ml-2 text-sm">{rating.toFixed(1)}</span>
				</div>

				<p className="mt-4 text-sm">{description}</p>

				<div className="flex gap-4 mt-6 flex-wrap">
					<Button className="rounded-md text-white bg-primary">Request Price</Button>
					<Button variant="destructive" className="rounded-md text-white bg-orange-600 hover:bg-orange-500">Urgent Price</Button>
					<Button variant="destructive" className="rounded-md text-white bg-blue-600 hover:bg-blue-500">View Details</Button>
				</div>
			</div>
		</div>
	);
};


