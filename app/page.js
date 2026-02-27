import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-pink-600 text-white text-center">

      <h1 className="text-4xl font-bold mb-4">
        Share Your Point of View
      </h1>

      <p className="mb-8">
        Join the moments together with Haziq & Abbydatul 
      </p>

      <Link href="/memories">
        <button className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold">
          Start Sharing
        </button>
      </Link>

    </main>
  );
}