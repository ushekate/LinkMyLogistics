import { ArrowDown, Bell, Boxes, CreditCard, FastForward, FileSearch2, FileText, LayoutDashboard, LayoutGrid, MailQuestion, MapPinned, MapPinnedIcon, Package, Receipt, ReceiptText, Scale, Scan, Truck, UploadIcon, User } from "lucide-react";

export const navLinks = [
	{
		label: "Dashboard",
		href: "/customer/dashboard",
		icon: LayoutDashboard,
		access: 'Customer',
	},
	{
		label: "Service Request",
		href: "/customer/service-requests",
		icon: ReceiptText,
		access: 'Customer',
	},
	{
		label: "CFS",
		href: '',
		icon: Truck,
		access: 'Customer',
		subItems: [
			{ label: "Requests", href: "/customer/cfs/requests", icon: MailQuestion, access: 'Customer', },
			{ label: "Services", href: "/customer/cfs/services", access: 'Customer', icon: FileSearch2 },
			{ label: "Track & Trace", href: "/customer/cfs/track-trace", access: 'Customer', icon: MapPinned },
			{ label: "Tariff Upload", href: "/customer/cfs/tariff-upload", access: 'Customer', icon: UploadIcon },
			{ label: "EIR / COP", href: '/customer/cfs/services/eir-cop', access: 'Customer', icon: FileText, },
			{ label: "Priority Movements", href: '/customer/cfs/services/priority', access: 'Customer', icon: FastForward, },
			{ label: "Weighment Slip", href: '/customer/cfs/services/weighment-slip', access: 'Customer', icon: Scale, },
			{ label: "Special Equipment", href: '/customer/cfs/services/special-equipment', access: 'Customer', icon: LayoutGrid, },
			{ label: "Container Grounding", href: '/customer/cfs/services/container-grounding', access: 'Customer', icon: ArrowDown, },
			{ label: "Container Staging", href: '/customer/cfs/services/container-staging', access: 'Customer', icon: Boxes, },
			{ label: "Re-Scanning", href: '/customer/cfs/services/rescan', access: 'Customer', icon: Scan, },
			{ label: "Cheque Acceptance", href: '/customer/cfs/services/cheque', access: 'Customer', icon: CreditCard, },
			{ label: "Tax Invoice", href: '/customer/cfs/services/tax-invoice', access: 'Customer', icon: Receipt, },
			{ label: "Job Order Update", href: '/customer/cfs/services/job-order', access: 'Customer', icon: FileText, },
			{ label: "Pricing", href: '/customer/cfs/services/pricing', access: 'Customer', icon: MapPinned, },
		]
	},
	{ label: "Notifications & Updates", href: "/customer/notifications", access: 'Customer', icon: Bell },
	{ label: "Profile & Support", href: "/customer/profile", access: 'Customer', icon: User },
	{ label: "Orders", href: "/customer/orders", access: 'Customer', icon: Package },


	// CFS
	{
		label: "Dashboard",
		href: "/client/dashboard",
		icon: LayoutDashboard,
		access: 'Client',
	},
	{
		label: "CFS",
		href: '',
		icon: Truck,
		access: 'Client',
		subItems: [
			{ label: "Requests", href: "/client/cfs/requests", icon: MailQuestion, access: 'Client', },
			{ label: "Services", href: "/client/cfs/services", access: 'Client', icon: FileSearch2 },
			{ label: "EIR / COP", href: '/client/cfs/services/eir-cop', access: 'Client', icon: FileText, },
			{ label: "Priority Movements", href: '/client/cfs/services/priority', access: 'Client', icon: FastForward, },
			{ label: "Weighment Slip", href: '/client/cfs/services/weighment-slip', access: 'Client', icon: Scale, },
			{ label: "Pricing Request", href: '/client/cfs/services/pricing', access: 'Client', icon: MapPinnedIcon, },
			{ label: "Special Equipment", href: '/client/cfs/services/special-equipment', access: 'Client', icon: LayoutGrid, },
			{ label: "Container Grounding", href: '/client/cfs/services/container-grounding', access: 'Client', icon: ArrowDown, },
			{ label: "Container Staging", href: '/client/cfs/services/container-staging', access: 'Client', icon: Boxes, },
			{ label: "Re-Scanning", href: '/client/cfs/services/rescan', access: 'Client', icon: Scan, },
			{ label: "Cheque Acceptance", href: '/client/cfs/services/cheque', access: 'Client', icon: CreditCard, },
			{ label: "Tax Invoice", href: '/client/cfs/services/tax-invoice', access: 'Client', icon: Receipt, },
			{ label: "Job Orders", href: '/client/cfs/services/job-order', access: 'Client', icon: FileText, },
		]
	},
	{ label: "Notifications & Updates", href: "/client/notifications", access: 'Client', icon: Bell },
	{ label: "Profile & Support", href: "/client/profile", access: 'Client', icon: User },
	{ label: "Orders", href: "/client/orders", access: 'Client', icon: Package },
]
