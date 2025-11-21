import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

const SendAirdrop = () => {
  // Use public Solana devnet for airdrops (better limits than Helius)
  const airdropConnection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  const { publicKey } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [solAmount, setSolAmount] = useState(0);

  const handleAirdrop = async () => {
    try {
      if (!publicKey) {
        toast.error("Please connect your wallet first.");
        return;
      }

      if (solAmount <= 0) {
        toast.error("Please enter a valid amount greater than 0.");
        return;
      }

      if (solAmount > 5) {
        toast.error("Maximum airdrop amount is 5 SOL at a time.");
        return;
      }

      setLoading(true);
      const signature = await airdropConnection.requestAirdrop(
        publicKey,
        solAmount * LAMPORTS_PER_SOL
      );

      // Wait for confirmation
      await airdropConnection.confirmTransaction(signature, "confirmed");

      setLoading(false);
      toast.success(`${solAmount} SOL airdropped successfully!`);
      setSolAmount(0); // Reset input
    } catch (error) {
      setLoading(false);
      console.log("Send airdrop error:", error);

      const errorMessage = error instanceof Error ? error.message : "";

      if (errorMessage.includes("429") || errorMessage.includes("rate limit")) {
        toast.error("Rate limit exceeded. Please try again in a few minutes.");
      } else if (errorMessage.includes("airdrop")) {
        toast.error(
          "Airdrop failed. You may have reached the daily limit (5 SOL)."
        );
      } else {
        toast.error("Airdrop failed. Please try again later.");
      }
    }
  };
  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 flex flex-col items-center justify-between rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-violet-100">
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center shadow-md">
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
          <h2 className="text-2xl font-bold text-violet-900">
            Request Airdrop
          </h2>
        </div>

        <p className="text-violet-700 mb-6">
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
          className="w-full px-4 py-3 bg-white border-2 border-violet-200 rounded-xl focus:border-violet-400 focus:outline-none transition-colors placeholder:text-gray-400"
        />

        <button
          onClick={handleAirdrop}
          className="w-full bg-violet-500 text-white py-3 rounded-xl font-semibold hover:bg-violet-600 transition-all shadow-md hover:shadow-lg"
        >
          {loading ? <Loader /> : "Request Airdrop"}
        </button>
      </div>
    </div>
  );
};

export default SendAirdrop;
