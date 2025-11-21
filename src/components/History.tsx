import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import type { VersionedTransactionResponse } from "@solana/web3.js";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";

const History = () => {
  const [trx, setTrx] = useState<(VersionedTransactionResponse | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  // Use public Solana endpoint for transaction history if Helius doesn't work
  const historyConnection = new Connection(
    import.meta.env.VITE_RPC_URL,
    "confirmed"
  );

  useEffect(() => {
    if (!publicKey) {
      toast.error("Please connect your wallet.");
      return;
    }

    const fetchTrx = async () => {
      try {
        setLoading(true);

        // Try Helius first
        let signatures = await connection.getSignaturesForAddress(publicKey, {
          limit: 20,
        });
        // If Helius returns 0, try public Solana endpoint
        if (signatures.length === 0) {
          signatures = await historyConnection.getSignaturesForAddress(
            publicKey,
            {
              limit: 20,
            }
          );
        }

        // promise.all executes all promises together instead of waiting for each
        const transactions = await Promise.all(
          signatures.map((sign) =>
            historyConnection.getTransaction(sign.signature, {
              maxSupportedTransactionVersion: 0,
            })
          )
        );

        setTrx(transactions);
        setLoading(false);
      } catch (error) {
        console.error("Fetch trx error:", error);

        toast.success(
          "Something went wrong while fetching transactions. Please try later."
        );
        setLoading(false);
      }
    };
    fetchTrx();
  }, [publicKey, connection]);

  // Helper function to format timestamp
  const formatDate = (timestamp: number | null | undefined) => {
    if (!timestamp) return "Unknown";
    return new Date(timestamp * 1000).toLocaleString();
  };

  // Helper function to get transaction amount
  const getTransactionAmount = (
    transaction: VersionedTransactionResponse | null
  ) => {
    if (!transaction || !transaction.meta) return null;

    const preBalances = transaction.meta.preBalances;
    const postBalances = transaction.meta.postBalances;

    if (preBalances.length > 0 && postBalances.length > 0) {
      const diff = (postBalances[0] - preBalances[0]) / LAMPORTS_PER_SOL;
      return diff;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    );
  }

  if (trx.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
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
        <p className="text-gray-500 text-lg">
          No transactions yet. Start by sending some SOL!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-wrap gap-4 h-[500px] overflow-y-auto">
      {trx.map((transaction, index) => {
        if (!transaction) return null;

        const signature = transaction.transaction.signatures[0];
        const blockTime = transaction.blockTime;
        const amount = getTransactionAmount(transaction);
        const success = transaction.meta?.err === null;

        return (
          <a
            key={signature}
            href={`https://solscan.io/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 hover:border-gray-300 w-[32%] h-[100px]"
          >
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 flex-1">
                {/* Transaction Number */}
                <div
                  className={`w-8 h-8 ${
                    success ? "bg-green-500" : "bg-red-500"
                  } rounded-lg flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-sm">
                    {index + 1}
                  </span>
                </div>

                {/* Transaction Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 font-medium">
                      {success ? "Success" : "Failed"}
                    </p>
                    {amount !== null && (
                      <span
                        className={`text-sm font-semibold ${
                          amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {amount > 0 ? "+" : ""}
                        {amount.toFixed(4)} SOL
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-700 font-mono">
                    {signature.slice(0, 16)}...{signature.slice(-16)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(blockTime)}
                  </p>
                </div>
              </div>

              {/* External Link Icon */}
              <svg
                className="w-5 h-5 text-gray-400 flex-shrink-0"
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
        );
      })}
    </div>
  );
};

export default History;
