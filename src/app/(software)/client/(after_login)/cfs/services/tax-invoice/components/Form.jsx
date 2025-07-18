import { Select, SelectItem } from '@/components/ui/Select';
import React, { useState } from 'react';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Upload } from 'lucide-react';
import OrderInput from '@/app/(software)/client/components/OrderInput';
import JobOrderInput from '@/app/(software)/client/components/JobOrderInput';
import { paymentModes } from '@/constants/common';
import { Dialog } from '@/components/ui/Dialog';

export default function Form() {
  const [formData, setFormData] = useState({
    orderId: '',
    invoiceNo: '',
    chaName: '',
    consigneeName: '',
    gstin: '',
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
    uploadedOn: new Date().toISOString().split('T')[0],
    subTotal: '',
    gstTotal: '',
    grossTotal: '',
    paymentMode: '',
    remarks: '',
    files: null
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

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    let newValue = ''
    if (value !== '') {
      newValue = parseFloat(value)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSelectChange = (name, value) => {
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
    <Dialog
      title={'Add New Tax Invoice'}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:min-w-[40dvw]">
          <OrderInput setOrderId={setOrderId} />

          <JobOrderInput setOrderId={setJobOrderId} />

          <div className='flex flex-col gap-2'>
            <Label title={'Invoice Number'} />
            <Input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              placeholder="Enter invoice number"
            />
          </div>

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
            <Label title={'Enter CHA Name'} />
            <Input
              type="text"
              name="chaName"
              value={formData.chaName}
              onChange={handleChange}
              placeholder="Enter CHA Name"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'GSTIN'} />
            <Input
              type="text"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              placeholder="Enter GSTIN"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Invoice Period (from)'} />
            <Input
              type="date"
              value={formData.from}
              onChange={handleChange}
              placeholder="Select date"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Invoice Period (to)'} />
            <Input
              type="date"
              value={formData.to}
              onChange={handleChange}
              placeholder="Select date"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Date of Submission'} />
            <Input
              type="date"
              value={formData.uploadedOn}
              onChange={handleChange}
              placeholder="Select date"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Sub Total'} />
            <Input
              type="number"
              name="subTotal"
              value={formData.subTotal}
              onChange={handleNumberChange}
              placeholder="Enter Sub Total (in Rs.)"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'GST Amount'} />
            <Input
              type="number"
              name="gstTotal"
              value={formData.gstTotal}
              onChange={handleNumberChange}
              placeholder="Enter GST Total (in Rs.)"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Gross Total'} />
            <Input
              type="number"
              name="grossTotal"
              value={formData.grossTotal}
              onChange={handleNumberChange}
              placeholder="Enter Total Amount (in Rs.)"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Payment Mode'} />
            <Select value={formData.paymentMode} onValueChange={(value) => handleSelectChange('paymentMode', value)} placeholder='Select Payment Mode'>
              {paymentModes.map((mode, index) => (
                <SelectItem key={index} value={mode.id}>{mode.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className='flex flex-col gap-2'>
            <Label title={'Remarks'} />
            <Input
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Any additional remarks..."
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
              <span className='text-sm'>Upload PO/Reference</span>
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
