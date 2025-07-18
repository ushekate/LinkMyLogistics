import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { Select, SelectItem } from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import { Dialog } from '@/components/ui/Dialog';
import JobOrderInput from '@/app/(software)/client/components/JobOrderInput';
import OrderInput from '@/app/(software)/client/components/OrderInput';

export default function Form() {

  const [formData, setFormData] = useState({
    consigneeName: '',
    stagingFromDate: new Date().toISOString().split('T')[0],
    expectedGateOut: new Date().toISOString().split('T')[0],
    containerNumber: '',
    containerSize: '',
    cargoType: '',
    previousLocation: '',
    newLocation: '',
    remarks: '',
    documents: null
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
    setFormData({
      ...formData,
      documents: e.target.files[0]
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

  };

  return (
    <Dialog
      title={'Add New Staging Entry'}
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

          <div className="flex flex-col gap-2">
            <Label title="Staging From Date" />
            <Input
              type="date"
              name="stagingFromDate"
              value={formData.stagingFromDate}
              onChange={handleInputChange}
              className="pr-8"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Expected Gate-Out" />
            <Input
              type="date"
              name="expectedGateOut"
              value={formData.expectedGateOut}
              onChange={handleInputChange}
              className="pr-8"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Container Number" />
            <Input
              type="text"
              name="containerNumber"
              placeholder="Enter container number"
              value={formData.containerNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Container Size" />
            <Select
              value={formData.containerSize}
              onValueChange={handleSelectChange('containerSize')}
              placeholder="Select size"
            >
              <SelectItem value="20ft">20ft</SelectItem>
              <SelectItem value="40ft">40ft</SelectItem>
              <SelectItem value="45ft">45ft</SelectItem>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Cargo Type" />
            <Select
              value={formData.cargoType}
              onValueChange={handleSelectChange('cargoType')}
              placeholder="Select type"
            >
              <SelectItem value="dry">Dry</SelectItem>
              <SelectItem value="reefer">Reefer</SelectItem>
              <SelectItem value="hazardous">Hazardous</SelectItem>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Previous Location" />
            <Input
              type="text"
              name="previousLocation"
              placeholder="Enter Previous Location"
              value={formData.previousLocation}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label title="New Location" />
            <Input
              type="text"
              name="newLocation"
              placeholder="Enter New Location"
              value={formData.newLocation}
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

          <div className="mt-4 flex flex-col gap-2">
            <Label title="Upload Documents" />
            <div className="flex items-center gap-2">
              <label className="flex items-center cursor-pointer border rounded-xl px-4 py-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
                <span className="text-sm">Choose File</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">
                {formData.documents ? formData.documents.name : 'No file chosen'}
              </span>
            </div>
          </div>

        </div>

        <div className="mt-6 flex justify-start">
          <Button
            title="Submit Request"
            className="rounded-xl"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </Dialog>
  );
};
