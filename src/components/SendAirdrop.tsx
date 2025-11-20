import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import Loader from "./Loader";

const SendAirdrop = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [solAmount, setSolAmount] = useState(0);
  const handleAirdrop = async () => {
    try {
      if (!publicKey) {
        alert("Connect to wallet");
        return;
      }
      setLoading(true);
      await connection.requestAirdrop(publicKey, 1000000000);
      setLoading(false);
      alert("1 SOl airdropped.");
    } catch (error) {
      alert("Too many request at the moment please try again later.");

      setLoading(false);
      console.log("Send airdrop error :", error);
    }
  };
  return (
    <div className="bg-white flex flex-col items-center justify-between  rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Request Airdrop</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Get test SOL tokens on devnet for development
        </p>
      </div>

      <div className="space-y-4 w-full">
        <input
          type="number"
          onChange={(e) => {
            setSolAmount(Number(e.target.value));
          }}
          min={0}
          value={solAmount}
          placeholder="Amount in SOL"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
        />

        <button
          onClick={handleAirdrop}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
        >
          {loading ? <Loader /> : "Request Airdrop"}
        </button>
      </div>
    </div>
  );
};

export default SendAirdrop;
