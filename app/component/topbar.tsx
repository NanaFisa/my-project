import { RefreshCw } from "lucide-react";

export default function Topbar() {
    return (
        <div className="bg-white border-b px-6 py-3">
            <div className="flex items-center justify-between mb-2">
            <input type="text" placeholder="Search" className="border rounded px-3 py-1 w-60 text-gray-300" />
            <img src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png" className="rounded-full w-10 h-10 bg-gray-100" />
            </div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-black">Data Entry</h2>
                <button className="bg-white-200 text-black px-4 py-2 rounded hover:bg-gray-300 border border-gray-300 flex items-center gap-2">
          <RefreshCw size={16} color="#D20103" />
        </button>
            </div>
            <hr className="border-t border-gray-300"/>
        </div>
    );
}