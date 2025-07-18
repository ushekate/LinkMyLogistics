'use client';

import { useState } from 'react';
import { Building2, Warehouse, Truck, Ship, Shield, Package } from 'lucide-react';
// import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox'; // or use ShadCN/any lib
import { Select, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Slider from '@/components/ui/Range';

const steps = [
  { label: 'Freight', icon: <Package /> },
  { label: 'Warehousing', icon: <Warehouse /> },
  { label: 'Trucking', icon: <Truck /> },
  { label: 'Ocean Freight', icon: <Ship /> },
  { label: 'Customs', icon: <Shield /> },
];

export default function LogisticsFilterPage() {
  const [filters, setFilters] = useState({
    location: '',
    provider: '',
    tariffRange: [5000, 15000],
    services: {
      freight: true,
      warehousing: true,
      trucking: true,
      ocean: true,
      customs: true,
    },
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 flex gap-6">
      {/* Sidebar Filters */}
      <aside className="w-72 bg-white rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Location</label>
          <Select onValueChange={(val) => handleFilterChange('location', val)}>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Mundra">Mundra</SelectItem>
            <SelectItem value="Chennai">Chennai</SelectItem>
          </Select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Provider</label>
          <Select onValueChange={(val) => handleFilterChange('provider', val)}>
            <SelectItem value="Maersk">Maersk</SelectItem>
            <SelectItem value="DB Schenker">DB Schenker</SelectItem>
          </Select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Tariff Range</label>
          <Slider
            min={1000}
            max={20000}
            step={1000}
            defaultValue={filters.tariffRange}
            onValueChange={(val) => handleFilterChange('tariffRange', val)}
          />
          <div className="text-sm mt-2 text-gray-500">
            ₹{filters.tariffRange[0]} - ₹{filters.tariffRange[1]}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Services</label>
          {Object.keys(filters.services).map((service) => (
            <div key={service} className="flex items-center space-x-2 mb-2">
              <Checkbox
                checked={filters.services[service]}
                onCheckedChange={(val) =>
                  setFilters((prev) => ({
                    ...prev,
                    services: { ...prev.services, [service]: val },
                  }))
                }
              />
              <label className="capitalize">{service}</label>
            </div>
          ))}
        </div>

        <Button className="w-full mt-4">Apply Filters</Button>
      </aside>

      {/* Step Timeline */}
      <main className="flex-1 bg-white rounded-xl p-6 shadow">
        <h1 className="text-xl font-bold mb-6">Service Flow</h1>
        <div className="flex items-center justify-between px-4">
          {steps.map((step, index) =>
            filters.services[step.label.toLowerCase().replace(/\s/g, '')] ? (
              <div key={index} className="flex flex-col items-center relative">
                <div className="bg-green-100 p-4 rounded-full text-green-700">{step.icon}</div>
                <p className="mt-2 text-sm font-medium">{step.label}</p>
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 left-full w-20 h-1 bg-green-500"></div>
                )}
              </div>
            ) : null
          )}
        </div>
      </main>
    </div>
  );
}
