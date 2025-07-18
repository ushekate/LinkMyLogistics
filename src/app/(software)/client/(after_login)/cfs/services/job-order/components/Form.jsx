import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Plus, Upload } from 'lucide-react';
import MultipleInput from '@/components/ui/MultipleInput';
import { Select, SelectItem } from '@/components/ui/Select';
import { cfsServices } from '@/constants/services';
import TextArea from '@/components/ui/TextArea';
import OrderInput from '@/app/(software)/client/components/OrderInput';
import { Dialog } from '@/components/ui/Dialog';

export default function CreateForm() {
  const [formData, setFormData] = useState({
    orderId: '',
    customerName: '',
    containers: [{ id: 1, value: '' }],
    serviceType: '',
    reason: '',
    file: null
  });
  const [orderId, setOrderId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      serviceType: value
    });
  };

  const handleAddField = (e) => {
    e.preventDefault();
    // Get the highest existing ID and add 1
    const newId = Math.max(0, ...formData.containers.map(field => field.id)) + 1;

    // Create a new container object
    const newContainer = { id: newId, value: '' };

    // Add the new container to the existing array
    setFormData({
      ...formData,
      containers: [...formData.containers, newContainer],
      totalContainers: formData.containers.length + 1
    });
  };

  const handleRemoveField = (id) => {
    // Only allow removal if there's more than one container
    if (formData.containers.length > 1) {
      const updatedContainers = formData.containers.filter(container => container.id !== id);

      setFormData({
        ...formData,
        containers: updatedContainers,
        totalContainers: updatedContainers.length
      });
    }
  };

  const handleMultipleInputChange = (id, value) => {
    setFormData({
      ...formData,
      containers: formData.containers.map(container =>
        container.id === id ? { ...container, value } : container
      )
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to Array for easier manipulation
      const filesArray = Array.from(e.target.files);
      filesArray.map((file) => {
        console.log(file.name)
      })

      setFormData({
        ...formData,
        files: filesArray // Store array of files instead of single file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Dialog
      title={'Add New Job Order'}
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
      <form className="pt-4 flex flex-col gap-6">
        <OrderInput setOrderId={setOrderId} />
        <div className="flex flex-col gap-2">
          <Label title="Consignee Name" />
          <Input
            value={formData.customerName}
            onChange={handleInputChange}
            placeholder="Enter Consignee Name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label title="Containers" />
          <MultipleInput
            inputFields={formData.containers}
            handleInputChange={handleMultipleInputChange}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
            placeholder='Enter container No.'
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label title="Service Type" />
          <Select value={formData.serviceType} onValueChange={handleSelectChange} placeholder='Select a Service'>
            {
              cfsServices.map((service, index) => (
                <SelectItem key={index} value={service.id}>{service.title}</SelectItem>
              ))
            }
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label title="Remarks" />
          <TextArea
            value={formData.reason}
            onChange={handleInputChange}
            placeholder="Enter Remarks...."
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label title="Upload Supporting Document" />
          <div className="flex items-center gap-2">
            <label className="flex items-center cursor-pointer border rounded-xl px-4 py-2">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
              </svg>
              <span className="text-sm">Choose File</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                multiple={true}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">
            Supported file types: PDF, JPG, PNG (max size: 5MB)
          </p>
        </div>

        <div>
          <Button
            title="Submit"
            icon={<Upload />}
            onClick={handleSubmit}
            className="rounded-xl"
          />
        </div>
      </form>
    </Dialog>
  );
};
