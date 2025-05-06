import ElectricityForm from "../component/electricity-form";
import Sidebar from "../component/sidebar";
import TabCard from "../component/tabcard";
import Topbar from "../component/topbar";

export default function Home() {

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-50">
                <Topbar />
                <div className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        <TabCard />
                    </div>
                    <div className="w-full md:w-1/2">
                        <ElectricityForm />
                    </div>
                </div>
            </div>
        </div>
    )
}