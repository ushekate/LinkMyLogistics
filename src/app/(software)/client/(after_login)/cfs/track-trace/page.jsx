'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect, useState } from "react";

export default function TrackTrace() {
	const { setTitle } = useSidebar();
	const [formData, setFormData] = useState({
		igm: '',
		bl: '',
		boe: '',
		container: '',
	});



	useEffect(() => {
		setTitle('Track & Trace');
	}, []);

	return (
		<div></div>
	)
}

