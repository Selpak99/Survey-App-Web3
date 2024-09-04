"use client";

import { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const SurveyResults: React.FC = () => {
  const [responses, setResponses] = useState<Array<{ answer1Count: bigint; answer2Count: bigint }>>([]);

  const { data: responseQ1 } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getResponses",
    args: [BigInt(0)],
  });

  const { data: responseQ2 } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getResponses",
    args: [BigInt(1)],
  });

  const { data: responseQ3 } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getResponses",
    args: [BigInt(2)],
  });

  const { data: responseQ4 } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getResponses",
    args: [BigInt(3)],
  });

  const { data: responseQ5 } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getResponses",
    args: [BigInt(4)],
  });

  const { data: responseQ6 } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getResponses",
    args: [BigInt(5)],
  });

  useEffect(() => {
    if (responseQ1 && responseQ2 && responseQ3 && responseQ4 && responseQ5 && responseQ6) {
      setResponses([
        { answer1Count: BigInt(responseQ1[0]), answer2Count: BigInt(responseQ1[1]) },
        { answer1Count: BigInt(responseQ2[0]), answer2Count: BigInt(responseQ2[1]) },
        { answer1Count: BigInt(responseQ3[0]), answer2Count: BigInt(responseQ3[1]) },
        { answer1Count: BigInt(responseQ4[0]), answer2Count: BigInt(responseQ4[1]) },
        { answer1Count: BigInt(responseQ5[0]), answer2Count: BigInt(responseQ5[1]) },
        { answer1Count: BigInt(responseQ6[0]), answer2Count: BigInt(responseQ6[1]) },
      ]);
    }
  }, [responseQ1, responseQ2, responseQ3, responseQ4, responseQ5, responseQ6]);

  // Verileri yüzdelik olarak hesapla
  const calculatePercentage = (answer1Count: bigint, answer2Count: bigint) => {
    const total = Number(answer1Count) + Number(answer2Count);
    if (total === 0) return { answer1: 0, answer2: 0 };
    return {
      answer1: (Number(answer1Count) / total) * 100,
      answer2: (Number(answer2Count) / total) * 100,
    };
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Survey Results</h1>
      </header>
      <div className="space-y-6">
        {responses.map((response, index) => {
          const percentages = calculatePercentage(response.answer1Count, response.answer2Count);
          return (
            <div key={index} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Question {index + 1}</h2>
              <div className="mb-4">
                <span className="font-medium">Answer 1:</span>
                <progress className="progress w-full" value={percentages.answer1} max="100"></progress>
                <span className="ml-2">
                  {Math.round(percentages.answer1)}% ({response.answer1Count.toString()})
                </span>
              </div>
              <div>
                <span className="font-medium">Answer 2:</span>
                <progress className="progress w-full" value={percentages.answer2} max="100"></progress>
                <span className="ml-2">
                  {Math.round(percentages.answer2)}% ({response.answer2Count.toString()})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SurveyResults;
