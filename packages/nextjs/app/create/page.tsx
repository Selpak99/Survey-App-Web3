"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const CreateSurvey: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(new Array(6).fill(""));
  const router = useRouter();
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  const handleChange = (questionId: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionId] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      // Convert string answers to bigint
      const answersAsBigInt = answers.map(answer => BigInt(answer));

      await writeYourContractAsync({
        functionName: "addAnswer",
        args: [answersAsBigInt],
      });

      router.push("/thank-you");
    } catch (e) {
      //
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Survey</h1>
        <p>Answer the following questions to earn ETH rewards for consistent answers.</p>
      </header>
      <form className="space-y-4">
        <div>
          <p className="font-semibold">1. Who is Satoshi Nakamato?</p>
          <label>
            <input
              type="radio"
              name="q1"
              value="0"
              checked={answers[0] === "0"}
              onChange={() => handleChange(0, "0")}
            />
            Founder of Ethereum
          </label>
          <label>
            <input
              type="radio"
              name="q1"
              value="1"
              checked={answers[0] === "1"}
              onChange={() => handleChange(0, "1")}
            />
            Founder of Bitcoin
          </label>
        </div>

        <div>
          <p className="font-semibold">2. When trading, which platform do you prefer?</p>
          <label>
            <input
              type="radio"
              name="q2"
              value="0"
              checked={answers[1] === "0"}
              onChange={() => handleChange(1, "0")}
            />
            Binance
          </label>
          <label>
            <input
              type="radio"
              name="q2"
              value="1"
              checked={answers[1] === "1"}
              onChange={() => handleChange(1, "1")}
            />
            Gate.io
          </label>
        </div>

        <div>
          <p className="font-semibold">3. What is your expectation for the cryptocurrency market?</p>
          <label>
            <input
              type="radio"
              name="q5"
              value="0"
              checked={answers[2] === "0"}
              onChange={() => handleChange(2, "0")}
            />
            Bullish
          </label>
          <label>
            <input
              type="radio"
              name="q5"
              value="1"
              checked={answers[2] === "1"}
              onChange={() => handleChange(2, "1")}
            />
            Bearish
          </label>
        </div>

        <div>
          <p className="font-semibold">4. When selling crypto, which method do you prefer?</p>
          <label>
            <input
              type="radio"
              name="q6"
              value="0"
              checked={answers[3] === "0"}
              onChange={() => handleChange(3, "0")}
            />
            Centralized Exchange (CEX)
          </label>
          <label>
            <input
              type="radio"
              name="q6"
              value="1"
              checked={answers[3] === "1"}
              onChange={() => handleChange(3, "1")}
            />
            Decentralized Exchange (DEX)
          </label>
        </div>

        <div>
          <p className="font-semibold">
            5.Considering Binance recently froze some Palestinian users’ accounts at the request of the Israeli
            government, do you worry that they might do the same to your account in the future?,
          </p>
          <label>
            <input
              type="radio"
              name="q7"
              value="0"
              checked={answers[4] === "0"}
              onChange={() => handleChange(4, "0")}
            />
            Yes, I do. It’s a concern for me that something similar could happen to my account in the future
          </label>
          <label>
            <input
              type="radio"
              name="q7"
              value="1"
              checked={answers[4] === "1"}
              onChange={() => handleChange(4, "1")}
            />
            No, I don’t. I trust that my account won’t be affected in a similar way.
          </label>
        </div>

        <div>
          <p className="font-semibold">6. Would Trump’s election as president be beneficial for cryptocurrencies?</p>
          <label>
            <input
              type="radio"
              name="q8"
              value="0"
              checked={answers[5] === "0"}
              onChange={() => handleChange(5, "0")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="q8"
              value="1"
              checked={answers[5] === "1"}
              onChange={() => handleChange(5, "1")}
            />
            No
          </label>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Answers
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurvey;
