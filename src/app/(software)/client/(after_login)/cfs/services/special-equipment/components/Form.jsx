import React, { useState } from 'react';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import JobOrderInput from '@/app/(software)/client/components/JobOrderInput';
import OrderInput from '@/app/(software)/client/components/OrderInput';
import { Plus } from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';

export default function Form() {
  const [formData, setFormData] = useState({
    consigneeName: '',
    containerNumber: '',
    equipmentType: '',
    productType: '',
    requiredDate: new Date().toISOString().split('T')[0],
    remarks: '',
    file: null
  });
  const [orderId, setOrderId] = useState('');
  const [jobOrderId, setJobOrderId] = useState('')
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', formData);

  };

  return (
    <Dialog
      title={'Add New Special Equipments Usage'}
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button
          title={'Add New'}
          icon={<Plus />}
          className='rounded-md'
          iconPosition='right'
        />
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-[40dvw]">
          <OrderInput setOrderId={setOrderId} />
          <JobOrderInput setOrderId={setJobOrderId} />

          <div className='flex flex-col gap-2'>
            <Label title={'Consignee Name'} />
            <Input
              type="text"
              name="consigneeName"
              value={formData.consigneeName}
              onChange={handleInputChange}
              placeholder="Enter Consignee Name"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Container Number'} />
            <Input
              type="text"
              name="containerNumber"
              value={formData.containerNumber}
              onChange={handleInputChange}
              placeholder="Enter container number"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Equipment Type'} />
            <Input
              type="text"
              name="equipmentType"
              value={formData.equipmentType}
              onChange={handleInputChange}
              placeholder="Enter equipment type"
            />
          </div>


          <div className='flex flex-col gap-2'>
            <Label title={'Product Type'} />
            <Input
              type="text"
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              placeholder="Enter product type"
            />
          </div>


          <div className='flex flex-col gap-2'>
            <Label title={'Required Date'} />
            <Input
              type="date"
              name="requiredDate"
              value={formData.requiredDate}
              onChange={handleInputChange}
              placeholder="Select date"
            />
          </div>


          <div className='flex flex-col gap-2'>
            <Label title={'Remarks (Optional)'} />
            <TextArea
              type="text"
              value={formData.remarks}
              onChange={handleInputChange}
              placeholder="Add any additional remarks or requirements..."
            />
          </div>


          <div className='flex flex-col gap-2'>
            <Label title={'Upload Documents'} />
            <div className="flex items-center gap-2">
              <label className="flex items-center cursor-pointer border rounded-xl px-4 py-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
                <span className='text-sm'>Choose File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <span className="text-sm text-gray-500 break-all max-w-full">
                {formData.file ? formData.file.name : "No file chosen"}
              </span>
            </div>
          </div>
        </div>


        <div className="flex justify-start mt-4">
          <Button
            title={'Submit Request'}
            className='rounded-lg'
          />
        </div>
      </form>
    </Dialog>
  );
};
