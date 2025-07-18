'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import LogisticsFilterPage from "./components/Filter";

export default function RedirectToLogin() {
	// const router = useRouter();
	// useEffect(() => {
	// 	if (router) {
	// 		router.push('/gol/login')
	// 	}
	// }, [router]);

	return (
		<section>
            <div>Gol Home Page</div>
            <LogisticsFilterPage />
        </section>
	)
}