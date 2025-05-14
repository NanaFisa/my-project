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
        <form className="flex flex-col gap-4" action="/api/submitElectricityBill" method="POST" encType="multipart/form-data">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            placeholderText="Month and Year"
            customInput={<CustomInput placeholder="Month and Year" />}
          />

          {selectedDate && (<p className="text-sm text-gray-600 ml-1">Selected Month: {selectedDate.toLocaleDateString('default', {month: 'long', year: 'numeric'})}</p>)}
          
          <input type="hidden" name="monthdate" value={selectedDate? selectedDate.toISOString() : ''} />
          <input name="accnum" placeholder="Account No" className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" value={accnum} onChange={(e) => setAccnum(e.target.value)} />
          <input name="invoicenum" placeholder="Invoice No" className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" value={invoicenum} onChange={(e) => setInvoicenum(e.target.value)} />
          <input name="sourcebill" placeholder="Source of Electricity Bill" className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" value={sourcebill} onChange={(e) => setSourcebill(e.target.value)} />
          <input name="kwh" placeholder="Energy Consumed (kwh)" className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" value={kwh} onChange={(e) => setKwh(e.target.value)} />
          {/* <button className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl shadow">Upload QR / Barcode</button> */}
          <input type="file" name="qrbarcode" onChange={(e) => setQrbarcode(e.target.files ? e.target.files[0] : null)}  className="border border-gray-300 p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-300" />
          <button type="submit" className="bg-white text-red-500 border border-red-800 py-2 rounded hover:bg-red-50">Save</button>
        </form>
      </div>
    </div>
  );
}
