export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-800">
      <h1 className="text-4xl font-bold mb-4">✅ Submission Successful!</h1>
      <p className="text-lg mb-8">Your electricity bill data has been saved.</p>
      <a href="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </a>
    </div>
  );
}
