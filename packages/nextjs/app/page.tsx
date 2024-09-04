"use client";

import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();
  const handleClick = () => {
    router.push("/create");
  };

  return (
    <div className="flex flex-col min-h-screen justify-center bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-6 max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">Welcome to Our Web3 Survey</h1>
          <div className="flex justify-center mt-4">
            <Address address={connectedAddress} />
          </div>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Participate in our survey and earn ETH! Ensure your answers are consistent to qualify for the reward.
          </p>
        </header>
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition duration-300 ease-in-out"
          >
            Start Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
