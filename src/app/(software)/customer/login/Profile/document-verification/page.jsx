'use client';
import { useState } from 'react';
import { UploadCloud, FileText, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const steps = ['Email Verification', 'Document Upload', 'Successful'];

export default function DocumentVerification() {
	const [uploadedFiles, setUploadedFiles] = useState({
		billOfLading: null,
		commercialInvoice: null,
		packingList: null,
	});
	const [currentStep, setCurrentStep] = useState(2);
	const router = useRouter();

	const handleFileChange = (event, type) => {
		const file = event.target.files[0];
		if (file && file.size <= 5 * 1024 * 1024) {
			setUploadedFiles((prev) => ({ ...prev, [type]: file }));
		} else {
			alert('File is too large. Maximum size is 5MB.');
		}
	};

	const handleUpload = async () => {
		if (!uploadedFiles.billOfLading || !uploadedFiles.commercialInvoice || !uploadedFiles.packingList) {
			alert('Please upload all required documents.');
			return;
		}

		console.log('Ready to upload:', uploadedFiles);


		setTimeout(() => {
			router.push('/customer/login/Profile/successful');
		}, 1000);
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-[var(--background)]">
			<div className="bg-[var(--accent)] shadow-lg rounded-lg p-6 w-full max-w-lg">


				<div className="w-full flex flex-col items-center space-y-2 mb-6">
					<div className="flex justify-between w-full">
						{steps.map((step, index) => {
							const stepNum = index + 1;
							const isActive = stepNum === currentStep;
							const isCompleted = stepNum < currentStep;

							return (
								<div key={step} className="flex flex-col items-center w-full text-center relative">
									<div
										className={cn(
											'w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold z-10',
											isActive
												? 'bg-[#2E7D32] text-white'
												: 'bg-gray-200 text-gray-600'
										)}
									>
										{stepNum}
									</div>
									<span className={cn('text-xs mt-1', isActive ? 'text-black font-medium' : 'text-gray-400')}>
										{step}
									</span>

									{index < steps.length - 1 && (
										<div className="absolute top-3 left-full w-full h-1 bg-gray-200 -z-10">
											<div
												className={cn(
													'h-1 bg-black',
													isCompleted ? 'w-full' : isActive ? 'w-1/2' : 'w-0'
												)}
											/>
										</div>
									)}
								</div>
							);
						})}
					</div>
					<div className="w-full h-1 bg-gray-200 mb-6">
						<div className="h-full bg-[#2E7D32] w-2/3 rounded" />
					</div>
				</div>


				<div className="flex justify-center items-center mb-4">
					<div className='bg-[#2E7D32] text-white rounded-full p-3'>
						<Lock className="w-6 h-6" />
					</div>
				</div>
					<h2 className="text-lg text-center font-semibold">Document Verification</h2>
					<p className="text-sm text-center text-gray-500">Your documents are being verified</p>
				


				<div className="border border-dashed bg-green-50 border-gray-400 hover:border-gray-500 rounded-lg p-4 mb-4 text-center">
					<UploadCloud className="mx-auto mb-2 text-gray-500" />
					<label className="cursor-pointer">
						<span className="bg-[#2E7D32] text-white px-4 py-2 rounded-md inline-block">Browse Bill of Lading</span>
						<input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'billOfLading')} />
					</label>
					{uploadedFiles.billOfLading && (
						<p className="text-xs text-green-600 mt-1">{uploadedFiles.billOfLading.name}</p>
					)}
					<p className="text-xs text-gray-500 mt-2">Maximum file size: 5MB</p>
				</div>

				{[
					{ label: 'Bill of Lading', key: 'billOfLading' },
					{ label: 'Commercial Invoice', key: 'commercialInvoice' },
					{ label: 'Packing List', key: 'packingList' },
				].map((doc, idx) => (
					<div key={idx} className="flex items-center justify-between border rounded-md p-3 mb-2">
						<div className="flex items-center gap-2">
							<FileText className="text-gray-500" size={18} />
							<span className="text-sm">{doc.label}</span>
						</div>
						<div className="flex items-center gap-2">
							<label className="cursor-pointer text-sm text-gray-600">
								+
								<input type="file" className="hidden" onChange={(e) => handleFileChange(e, doc.key)} />
							</label>
							{uploadedFiles[doc.key] && (
								<span className="text-xs text-green-600">{uploadedFiles[doc.key].name}</span>
							)}
						</div>
					</div>
				))}


				<button
					className="w-full mt-4 bg-[#2E7D32] h-10 rounded text-white hover:bg-green-800"
					onClick={handleUpload}
				>
					Upload Documents
				</button>

				<p className="text-center text-xs text-gray-400 mt-2">Need help? Contact support</p>
			</div>
		</div>
	);
}
