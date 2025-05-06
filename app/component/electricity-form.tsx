'use client';
import { Calendar, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ElectricityForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const CustomInput = React.forwardRef<HTMLInputElement, {
    value?: string;
    onClick?: () => void;
    placeholder?: string
  }>(({ value, onClick, placeholder }, ref) => (
    <div className="relative">
      <input
        type="text"
        className="border p-2 rounded text-black w-full pl-3 pr-10"
        value={value}
        onClick={onClick}
        ref={ref}
        placeholder={placeholder}
        readOnly
      />
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
        onClick={onClick}
      >
        <Calendar className="w-5 h-5" />
      </span>
    </div>
  ));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 ml-auto">
          <RefreshCw size={16} />
        </button>
      </div>
      <div className="bg-white p-6 border rounded shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Electricity Bill</h2>
          <button className="bg-red-800 px-3 py-1 rounded text-sm hover:bg-red-300">
            Reset
          </button>
        </div>
        <form className="flex flex-col gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            placeholderText="Month and Year"
            customInput={<CustomInput />}
          />
          <input placeholder="Account No" className="border p-2 rounded text-black" />
          <input placeholder="Invoice No" className="border p-2 rounded text-black" />
          <input placeholder="Source of Electricity Bill" className="border p-2 rounded text-black" />
          <input placeholder="Energy Consumed (kwh)" className="border p-2 rounded text-black" />
          <button className="bg-red-800 text-white py-2 rounded">Upload QR / Barcode</button>
          <button type="submit" className="bg-white text-red-500 border border-red-800 py-2 rounded hover:bg-red-50">Save</button>
        </form>
      </div>
    </div>
  )
}
