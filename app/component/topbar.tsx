export default function Topbar() {
    return (
        <div className="bg-white border-b h-16 flex items-center justify-between px-6">
            <input type="text" placeholder="Search" className="border rounded px-3 py-1 w-60 text-black" />
            <div className="rounded-full w-10 h-10 bg-gray-300" />
        </div>
    )
}