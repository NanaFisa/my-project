'use client';
import { useState } from 'react';
import { Zap } from "@deemlol/next-icons";
import { Fuel, Clock } from 'lucide-react';

export default function TabCard() {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (button: any) => {
        setActiveButton(button);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Data Entry</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div 
                    className={`flex items-center gap-2 text-left p-4 border rounded ${activeButton === 'electricity' ? 'bg-red-100 text-red-700 font-semibold' : 'text-black'}`} 
                    onClick={() => handleButtonClick('electricity')}
                >
                    <Zap size={48} />Electricity Bill
                </div>
                <div 
                    className={`flex items-center gap-2 text-left p-4 border rounded ${activeButton === 'consumption' ? 'bg-red-100 text-red-700 font-semibold' : 'text-black'}`} 
                    onClick={() => handleButtonClick('consumption')}
                >
                    <Fuel size={48} />Consumption
                </div>
                <div 
                    className={`flex items-center gap-2 text-left p-4 border rounded ${activeButton === 'lorem' ? 'bg-red-100 text-red-700 font-semibold' : 'text-black'}`} 
                    onClick={() => handleButtonClick('lorem')}
                >
                    <Clock size={48}/>Lorem Ipsum
                </div>
            </div>
        </div>
    );
}