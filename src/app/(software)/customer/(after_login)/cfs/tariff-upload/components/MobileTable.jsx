import Input from "@/components/ui/Input";
import { Download, Eye, Search } from "lucide-react";
import { useEffect, useState } from "react"
import { tariffs } from "@/constants/orders";

export default function MobileTable() {
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredTariffs, setFilteredTariffs] = useState([]);

	useEffect(() => {
		if (searchQuery === '') {
			setFilteredTariffs(tariffs);
		} else {
			setFilteredTariffs(tariffs.filter((tariff) => tariff.order.id.toLowerCase().includes(searchQuery.toLowerCase())))
		}
	}, [searchQuery]);

	const downloadFile = (url) => {
		const link = document.createElement('a');
		link.setAttribute('href', url)
		link.setAttribute('download', url)
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div className="border rounded-xl p-4">
			<h1 className="text-lg font-semibold">Uploaded Tariffs</h1>
			<div className="flex-1 relative my-4">
				<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type='text'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder='Search by Order ID'
					className="pl-8 w-full bg-[var(--accent)]"
				/>
			</div>


			<div className="grid gap-4">
				{
					filteredTariffs.map((tariff, index) => (
						<div key={index} className="border rounded-xl p-4 bg-[var(--accent)]">
							<div className="flex items-center justify-between gap-4">
								<h1 className="text-sm font-semibold">{tariff.filePath}</h1>
								<Download className="w-5 h-5 text-[var(--primary)]" onClick={() => downloadFile(tariff.filePath)} />
							</div>
							<h2 className="text-sm">{tariff.order.id}</h2>
							<div className="flex items-center justify-between gap-4">
								<p className="text-sm font-light">{tariff.uploadedOn}</p>
								<p className="text-sm font-semibold">{tariff.remarks}</p>
							</div>
						</div>
					))
				}

			</div>


		</div>
	)
}

