import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import getBalance from "../utils/getBalance";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [airdropAmount, setAirdropAmount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<Number>();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  if (!publicKey) {
    alert("Connect you wallet.");
    return;
  }

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const lamps = await connection.getBalance(publicKey);
        setBalance(lamps / LAMPORTS_PER_SOL);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Balance error:", error);
        alert("Something went wrong while fetching the balance.");
      }
    };

    fetchBalance();

    // real-time connection
    const subscriptionId = connection.onAccountChange(
      publicKey,
      (accountInfo) => {
        setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    // cleanup
    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [publicKey, connection]);

  return (
    <div className="min-h-screen bg-gradient-to-br min-w-[75rem] from-purple-50 via-blue-50 to-cyan-50">
      {/* Round Navbar */}
      <nav className="px-6 py-4">
        <div className="max-w-6xl mx-auto bg-white rounded-full shadow-lg px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="  px-3 py-2 rounded-md  flex items-center justify-center">
                <span className="text-black font-semibold text-xl">
                  Balance(SOL) : {loading ? "Loading..." : balance?.toString()}
                </span>
              </div>
            </div>

            {/* Wallet Button */}
            <WalletMultiButton style={{ backgroundColor: "black" }} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-6 py-8 m-5">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg inline-flex">
            <button
              onClick={() => setActiveView("dashboard")}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                activeView === "dashboard"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView("history")}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                activeView === "history"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Dashboard View */}
        {activeView === "dashboard" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Send Airdrop Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
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
                <h2 className="text-2xl font-bold text-gray-800">
                  Request Airdrop
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Get test SOL tokens on devnet for development
              </p>

              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Amount in SOL"
                  value={airdropAmount}
                  onChange={(e) => setAirdropAmount(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl">
                  Request Airdrop
                </button>
              </div>
            </div>

            {/* Send SOL Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Send SOL</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Transfer SOL to any Solana wallet address
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Recipient's Public Key"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />

                <input
                  type="number"
                  placeholder="Amount in SOL"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />

                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl">
                  Send Transaction
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History View */}
        {activeView === "history" && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center ">
              <div className=" bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Transaction History
              </h2>
            </div>

            {/* {txHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No transactions yet. Start by sending some SOL!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {txHistory.map((signature, index) => (
                  <a
                    key={index}
                    href={`https://solscan.io/tx/${signature}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 hover:border-gray-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Transaction
                          </p>
                          <p className="text-xs text-gray-700 font-mono">
                            {signature.slice(0, 8)}...{signature.slice(-8)}
                          </p>
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
