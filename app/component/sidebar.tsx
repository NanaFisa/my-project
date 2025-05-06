'use client'
import { useState } from 'react';
import { House } from "@deemlol/next-icons";
import { Clipboard } from "@deemlol/next-icons";
import { Edit2 } from "@deemlol/next-icons";
import { Headset } from 'lucide-react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [activeButton, setActiveButton] = useState(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleButtonClick = (buttonName: any) => {
        setActiveButton(buttonName);
    };

    return (
        <aside className={`w-60 bg-white border-r h-full p-4 flex flex-col ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center mb-8">
                <button onClick={toggleSidebar} className="text-black font-bold mr-2">
                    &#9776;
                </button>
                <h1 className="text-xl font-bold text-black">GHG Dashboard</h1>
            </div>
            <nav className="flex flex-col gap-4 flex-grow">
                <button
                    className={`flex items-center gap-2 text-left font-semibold ${
                        activeButton === 'Overview' 
                            ? 'bg-red-100 border-l-4 border-red-500 text-red-600' 
                            : 'bg-white text-black'
                    } w-full py-2 pl-3 hover:bg-gray-50`}
                    onClick={() => handleButtonClick('Overview')}
                >
                    <House size={24} color={activeButton === 'Overview' ? "#EF4444" : "#000000"} />
                    Overview
                </button>
                <button
                    className={`flex items-center gap-2 text-left font-semibold ${
                        activeButton === 'Report' 
                            ? 'bg-red-100 border-l-4 border-red-500 text-red-600' 
                            : 'bg-white text-black'
                    } w-full py-2 pl-3 hover:bg-gray-50`}
                    onClick={() => handleButtonClick('Report')}
                >
                    <Clipboard size={24} color={activeButton === 'Report' ? "#EF4444" : "#000000"} />
                    Report
                </button>
                <button
                    className={`flex items-center gap-2 text-left font-semibold ${
                        activeButton === 'Data Entry' 
                            ? 'bg-red-100 border-l-4 border-red-500 text-red-600' 
                            : 'bg-white text-black'
                    } w-full py-2 pl-3 hover:bg-gray-50`}
                    onClick={() => handleButtonClick('Data Entry')}
                >
                    <Edit2 size={24} color={activeButton === 'Data Entry' ? "#EF4444" : "#000000"} />
                    Data Entry
                </button>
            </nav>
            <button className="
                self-center        /* Center horizontally */
                w-12             /* Width */
                h-12             /* Height */
                rounded-full     /* Perfect circle */
                bg-red-600       /* Red background */
                text-white       /* White icon */
                flex             /* Flex center */
                items-center     
                justify-center
                shadow-md        /* Subtle shadow */
                hover:bg-red-700 /* Hover state */
                transition       /* Smooth transition */
                mb-4            /* Bottom margin */
                focus:outline-none
                focus:ring-2     /* Focus ring */
                focus:ring-red-300
            ">
                <Headset size={24} />
            </button>
        </aside>
    );
}
