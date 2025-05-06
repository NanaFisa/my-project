import { Zap } from "@deemlol/next-icons";
import { Fuel, Clock, RefreshCw } from 'lucide-react';

export default function TabCard() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Data Entry</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-left p-4 border rounded bg-red-100 text-red-700 font-semibold text-black">
                    <Zap size={24} color="#000000" />Electricity Bill
                </div>
                <div className="flex items-center gap-2 text-left p-4 border rounded text-black">
                    <Fuel />Consumption
                </div>
                <div className="flex items-center gap-2 text-left p-4 border rounded text-black">
                    <Clock />Lorem Ipsum
                </div>
            </div>
        </div>
    );
}
