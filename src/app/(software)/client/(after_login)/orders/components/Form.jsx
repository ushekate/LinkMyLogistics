import { Select, SelectItem } from '@/components/ui/Select';
import React, { useState } from 'react';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Upload } from 'lucide-react';
import { ServiceProviders } from '@/constants/services';

export default function Form() {
  const [formData, setFormData] = useState({
    ibmNumber: '',
    blNumber: '',
    boeNumber: '',
    commodityDescription: '',
    containerNumber: '',
    pickUpLocation: '',
    containerSize: '',
    deliveryLocation: '',
    cargoType: '',
    expectedDate: new Date().toISOString().split('T')[0],
    weight: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
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
    <div className="border rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold text-green-900 mb-4">Create new Order</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='flex flex-col gap-2'>
            <Label title={'IBM Number'} />
            <Input
              type="text"
              name="IBMNumber"
              value={formData.ibmNumber}
              onChange={handleChange}
              placeholder="Enter IBM number"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'BL Number'} />
            <Input
              type="text"
              name="blNumber"
              value={formData.blNumber}
              onChange={handleChange}
              placeholder="Enter BL number"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'BOE Number'} />
            <Input
              type="text"
              name="boeNumber"
              value={formData.boeNumber}
              onChange={handleChange}
              placeholder="Enter BOE number"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Commodity Description'} />
            <Input
              type="text"
              name="commodityDescription"
              value={formData.commodityDescription}
              onChange={handleChange}
              placeholder="Enter Commodity Description"
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
            <Label title={'Pickup Location'} />
            <Input
              type="text"
              value={formData.pickUpLocation}
              onChange={handleChange}
              placeholder="Enter Pickup Location"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Container Size'} />
            <Input
              type="text"
              name="containerSize"
              value={formData.containerSize}
              onChange={handleChange}
              placeholder="Enter container size"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Delivery Location'} />
            <Input
              type="text"
              value={formData.deliveryLocation}
              onChange={handleChange}
              placeholder="Enter Delivery Location"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Cargo Type'} />
            <Select value={formData.cargoType} onValueChange={handleChange} placeholder='Select Cargo Type'>
              <SelectItem value='Dry'>Dry</SelectItem>
              <SelectItem value='Liquid'>Liquid</SelectItem>
              <SelectItem value='Bulk'>Bulk</SelectItem>
              <SelectItem value='Refrigerated'>Refrigerated</SelectItem>
            </Select>
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Expected Date'} />
            <Input
              type="date"
              value={formData.expectedDate}
              onChange={handleChange}
              placeholder="Select date"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Weight (in tons)'} />
            <Input
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter weight in tons"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'CFS Facility'} />
            <Select value={formData.cfsProvider} onValueChange={handleChange} placeholder='Select CFS Facility'>
              {
                ServiceProviders.map((provider, index) => (
                  <SelectItem key={index} value={provider.id}>{provider.title} - {provider.location}</SelectItem>
                ))
              }
            </Select>
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
          <Button title={'Submit Request'} icon={<Upload />} iconPosition='right' className='rounded-xl' />
        </div>
      </form>
    </div>
  );
};
