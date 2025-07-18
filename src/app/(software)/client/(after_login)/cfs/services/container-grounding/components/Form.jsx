import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { Plus, Upload } from 'lucide-react';
import OrderInput from '@/app/(software)/client/components/OrderInput';
import JobOrderInput from '@/app/(software)/client/components/JobOrderInput';
import { Dialog } from '@/components/ui/Dialog';
import TextArea from '@/components/ui/TextArea';

export default function Form() {
  const [formData, setFormData] = useState({
    consigneeName: '',
    containerNumber: '',
    groundingDate: new Date().toISOString().split('T')[0],
    groundingZone: '',
    groundingType: '',
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

  const handleSelectChange = (name) => (value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0]
      });
    }
  };

  const handleSubmit = () => {

    console.log('Submitting grounding request:', formData);
  };

  return (
    <Dialog
      title={'Add New Grounding Entry'}
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
            <Label title="Container Number" />
            <Input
              type="text"
              name="containerNumber"
              placeholder="Enter container number"
              value={formData.containerNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title="Grounding Date" />
            <Input
              type="date"
              name="groundingDate"
              value={formData.groundingDate}
              onChange={handleInputChange}
              placeholder="Select date"
              className="pr-8"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title="Grounding Zone" />
            <Input
              type="text"
              name="groundingZone"
              placeholder="Enter Grounding Zone"
              value={formData.groundingZone}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title="Grounding Type" />
            <Input
              type="text"
              name="groundingType"
              placeholder="Enter"
              value={formData.groundingType}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Label title="Remarks" />
            <TextArea
              name="remarks"
              placeholder="Add any remarks..."
              value={formData.remarks}
              onChange={handleInputChange}
            />
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
        </div>

        <div className="mt-6">
          <Button title={'Upload'} icon={<Upload />} iconPosition='right' className='rounded-xl' />
        </div>
      </form>
    </Dialog>
  );
};
