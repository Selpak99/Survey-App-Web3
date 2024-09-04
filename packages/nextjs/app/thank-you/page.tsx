"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ThankYou: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 dark:text-black">Thank You!</h1>
        <p className="mb-6 text-gray-600">
          Thank you for completing the survey. Your answers have been successfully submitted.
        </p>
        <button
          onClick={() => router.push("/analysis")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Would you like to see analysis?
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
