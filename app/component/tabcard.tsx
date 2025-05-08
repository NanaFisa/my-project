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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div 
                    className={`p-4 border rounded-xl shadow hover:shadow-md cursor-pointer transition duration-300 ${activeButton === 'electricity' ? 'bg-red-100 text-red-700 font-semibold' : 'text-black'}`} 
                    onClick={() => handleButtonClick('electricity')}
                >
                    <Zap size={48} />Electricity Bill
                </div>
                <div 
                    className={`p-4 border rounded-xl shadow hover:shadow-md cursor-pointer transition duration-300 ${activeButton === 'consumption' ? 'bg-red-100 text-red-700 font-semibold' : 'text-black'}`} 
                    onClick={() => handleButtonClick('consumption')}
                >
                    <Fuel size={48} />Consumption
                </div>
                <div 
                    className={`p-4 border rounded-xl shadow hover:shadow-md cursor-pointer transition duration-300 ${activeButton === 'lorem' ? 'bg-red-100 text-red-700 font-semibold' : 'text-black'}`} 
                    onClick={() => handleButtonClick('lorem')}
                >
                    <Clock size={48}/>Lorem Ipsum
                </div>
            </div>
        </div>
    );
}