export default function DashboardPage() {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Greenhouse Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor and control your environment</p>
        </header>
  
        {/* Grid Layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Card Example */}
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">Temperature</h2>
            <p className="text-2xl text-green-600 font-bold mt-2">26°C</p>
          </div>
  
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">Humidity</h2>
            <p className="text-2xl text-blue-600 font-bold mt-2">60%</p>
          </div>
  
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700">Light Intensity</h2>
            <p className="text-2xl text-yellow-600 font-bold mt-2">750 Lux</p>
          </div>
        </section>
      </main>
    );
  }
  