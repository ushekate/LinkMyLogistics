import { Select, SelectItem } from '@/components/ui/Select';
import React, { useState } from 'react';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Upload } from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import OrderInput from '@/app/(software)/client/components/OrderInput';
import JobOrderInput from '@/app/(software)/client/components/JobOrderInput';

export default function Form() {
  const [formData, setFormData] = useState({
    consigneeName: '',
    containerNumber: '',
    movementType: '',
    conditionIn: '',
    timeSlot: '',
    conditionOut: '',
    type: '',
    requestedDate: new Date().toISOString().split('T')[0],
    remarks: '',
    file: null
  });
  const [orderId, setOrderId] = useState('');
  const [jobOrderId, setJobOrderId] = useState('')
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', formData);
  };

  return (
    <Dialog
      title={'Upload New Receipt'}
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
              onChange={handleChange}
              placeholder="Enter Consignee Name"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Container Number'} />
            <Input
              type="text"
              name="containerNumber"
              value={formData.containerNumber}
              onChange={handleChange}
              placeholder="Enter container number"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Type'} />
            <Select
              value={formData.type}
              onValueChange={handleSelectChange('type')}
              placeholder="Select Type"
            >
              <SelectItem value="EIR">EIR (Equipment Interchange Receipt)</SelectItem>
              <SelectItem value="COP">COP (Container Operational Permit)</SelectItem>
            </Select>
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Movement Type'} />
            <Select
              value={formData.movementType}
              onValueChange={handleSelectChange('movementType')}
              placeholder="Select Movement Type"
            >
              <SelectItem value="Import">Import</SelectItem>
              <SelectItem value="Export">Export</SelectItem>
            </Select>
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Condition In'} />
            <Input
              value={formData.conditionIn}
              onChange={handleChange}
              placeholder="Enter conditionIn"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Condition Out'} />
            <Input
              value={formData.conditionOut}
              onChange={handleChange}
              placeholder="Enter conditionOut"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Date'} />
            <Input
              type="date"
              value={formData.requestedDate}
              onChange={handleChange}
              placeholder="Select date"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Remarks (optional)'} />
            <Input
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Remarks (optional)"
            />
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-4'>
          <Label title={'Upload Documents'} />
          <div className="flex items-center gap-2 mt-2">
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
            <span className="ml-2 text-sm text-gray-500">
              {formData.file ? formData.file.name : 'No file chosen'}
            </span>
          </div>
        </div>


        <div className="mt-6">
          <Button title={'Upload Request'} icon={<Upload />} iconPosition='right' className='rounded-xl' />
        </div>
      </form>
    </Dialog>
  );
};
