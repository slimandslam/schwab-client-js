import StockDashboard from "../components/StockDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-3">
          NVIDIA (NVDA) Dashboard
        </h1>
      </div>
      <StockDashboard />
    </main>
  );
}
