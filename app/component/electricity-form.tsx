'use client';
import { Calendar } from 'lucide-react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ElectricityForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [accnum, setAccnum] = useState('');
  const [invoicenum, setInvoicenum] = useState('');
  const [sourcebill, setSourcebill] = useState('');
  const [kwh, setKwh] = useState('');
  const [qrbarcode, setQrbarcode] = useState<File | null>(null);

  const handleSubmit = async (e:React.FormEvent) => { e.preventDefault();

    const formData = new FormData();
    formData.append('monthdate', selectedDate?.toISOString() || '');
    formData.append('accnum', accnum);
    formData.append('invoicenum', invoicenum);
    formData.append('sourcebill', sourcebill);
    formData.append('kwh', kwh);
    if (qrbarcode) {
      formData.append('qrbarcode', qrbarcode);
    }

    const response = await fetch('/api/submitElectricityBill', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 
      //   'application/json',
      // },
      body: formData,
    });

    if (response.ok) {
      alert('Data submitted successfully');
    } else {
      alert('Failed to submit data');
    }
  };

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
      <div className="bg-white p-6 border rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Electricity Bill</h2>
          <button className="bg-red-800 hover:bg-red-100 text-white-100 font-semibold px-4 py-2 rounded-xl border border-red-300 shadow-sm">
            Reset
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            placeholderText="Month and Year"
            customInput={<CustomInput />}
          />
          <input placeholder="Account No" className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" value={accnum} onChange={(e) => setAccnum(e.target.value)} />
          <input placeholder="Invoice No" className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" value={invoicenum} onChange={(e) => setInvoicenum(e.target.value)} />
          <input placeholder="Source of Electricity Bill" className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" value={sourcebill} onChange={(e) => setSourcebill(e.target.value)} />
          <input placeholder="Energy Consumed (kwh)" className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" value={kwh} onChange={(e) => setKwh(e.target.value)} />
          {/* <button className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl shadow">Upload QR / Barcode</button> */}
          <input type="file" onChange={(e) => setQrbarcode(e.target.files ? e.target.files[0] : null)}  className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" />
          <button type="submit" className="bg-white text-red-500 border border-red-800 py-2 rounded hover:bg-red-50">Save</button>
        </form>
      </div>
    </div>
  );
}
