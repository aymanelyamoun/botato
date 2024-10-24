'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/companies");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button 
        onClick={handleClick} 
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Go to Companies
      </button>
    </div>
  );
}