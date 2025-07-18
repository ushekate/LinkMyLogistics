'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function RedirectToLogin() {
	const router = useRouter();
	useEffect(() => {
		if (router) {
			router.push('/gol/home')
		}
	}, [router]);

	return (
		<div>Gol Home Page</div>
	)
}
