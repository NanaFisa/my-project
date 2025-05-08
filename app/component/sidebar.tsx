'use client';
import { useState } from 'react';
import { House } from "@deemlol/next-icons";
import { Clipboard } from "@deemlol/next-icons";
import { Edit2 } from "@deemlol/next-icons";
import { Headset } from 'lucide-react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const toggleSidebar = (): void => {
        setIsOpen(!isOpen);
    };

    const handleButtonClick = (buttonName: string): void => {
        setActiveButton(buttonName);
    };

    return (
        <aside className={`w-60 bg-white border-r h-full p-4 flex flex-col ${isOpen ? 'block' : 'hidden'}`}>
             <div className="mb-8">
                <div className="flex items-center gap-20 mb-2">
                    <button 
                        onClick={toggleSidebar} 
                        className="text-black font-bold p-1 hover:bg-gray-100 rounded"
                        aria-label="Toggle sidebar"
                    >
                        &#9776;
                    </button>
                    
                    <img 
                        src="https://foundry360.io/_next/image?url=%2Fimages%2Flogo-f360.png&w=640&q=75" 
                        alt="Apps Logo" 
                        className="w-15 h-15 rounded-full"
                    />
                </div>
            <div className="flex items-center gap-5 mb-2">
            <img 
                        src="https://th.bing.com/th/id/OIP.gC8049qreQoymjGFMJIqugAAAA?cb=iwc1&rs=1&pid=ImgDetMain" 
                        alt="Tenant Logo" 
                        className="w-10 h-10 rounded-full"
                    />
                <h6 className="text-lg font-bold text-black text-center">Green House Gas Dashboard</h6>
            </div>
                
            </div>

            <nav className="flex flex-col gap-4 flex-grow">
                <button
                    className={`flex items-center gap-2 text-left font-semibold rounded ${
                        activeButton === 'Overview' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-white text-gray-500'
                    } w-full py-2 pl-3 hover:bg-red-100`}
                    onClick={() => handleButtonClick('Overview')}
                >
                    <House size={24} color={activeButton === 'Overview' ? "#EF4444" : "#686767"} />
                    <span>Overview</span>
                </button>
                
                <button
                    className={`flex items-center gap-2 text-left font-semibold rounded ${
                        activeButton === 'Report' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-white text-gray-500'
                    } w-full py-2 pl-3 hover:bg-red-100`}
                    onClick={() => handleButtonClick('Report')}
                >
                    <Clipboard size={24} color={activeButton === 'Report' ? "#EF4444" : "#686767"} />
                    <span>Report</span>
                </button>
                
                <button
                    className={`flex items-center gap-2 text-left font-semibold rounded ${
                        activeButton === 'Data Entry' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-white text-gray-500'
                    } w-full py-2 pl-3 hover:bg-red-100`}
                    onClick={() => handleButtonClick('Data Entry')}
                >
                    <Edit2 size={24} color={activeButton === 'Data Entry' ? "#EF4444" : "#686767"} />
                    <span>Data Entry</span>
                </button>
            </nav>

            <button 
                className="
                    self-center w-12 h-12 rounded-full bg-red-600 text-white
                    flex items-center justify-center shadow-md hover:bg-red-700
                    transition mb-4 focus:outline-none focus:ring-2 focus:ring-red-300
                "
                aria-label="Support"
            >
                <Headset size={24} />
            </button>
        </aside>
    );
}